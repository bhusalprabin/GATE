const express = require("express");
const Student = require("../models/student");
const studentAuth = require("../middleware/studentAuth");
const tutorAuth = require("../middleware/tutorAuth1");
const router = new express.Router();
const multer = require("multer");
const sharp = require("sharp");
const nodemailer = require("nodemailer");
const Tutor = require("../models/tutor");
const Course = require("../models/course");
const { OAuth2Client } = require("google-auth-library");
const Rating = require("../models/rating");
const client = new OAuth2Client(
  "702118801258-qsne30uenciqf1fk16f3ddnjelhemo9u.apps.googleusercontent.com"
);

//create student
router.post("/students", async (req, res) => {
  if (Student.findOne(req.body.email)) {
    console.log("email already used");
  }
  const student = new Student(req.body);

  try {
    await student.save();
    const token = await student.generateAuthToken();

    res.cookie("gate", token, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true,
    });

    res.status(201).send({ student, token });
    //sending emails
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "gateofficial.nepal@gmail.com",
        pass: "gate123@@@",
      },
    });
    var mailOptions = {
      from: "gateofficial.nepal@gmail.com",
      to: student.email,
      subject: "New Student Registration",
      // text: `Hi Smartherd, thank you for your nice Node.js tutorials.
      //     I will donate 50$ for this course. Please send me payment options.`,
      html:
        "<h1>Hi " +
        student.name +
        ",Welcome to Gate.</h1><p> You are all set. Now you can find Tutors as per your requiremts. <br> Thank You</p>",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    //ontinue
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

//login student
router.post("/students/login", async (req, res) => {
  try {
    const student = await Student.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await student.generateAuthToken();

    res.cookie("gate", token, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true,
    });
    //must pass as object
    res.status(200).send({ student, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// pawan ko chitta bujhaauna lekheko code
// router.post("/students/*", studentAuth, (req, res) => {
//   res.send("hello");
// });

//logout student
router.get("/students/logout", async (req, res) => {
  /*
  try {
    req.student.tokens = req.student.tokens.filter((token) => {
      return token.token !== req.token;
    });
    req.session.destroy(function (err) {
    res.redirect('/');
  });
    await req.student.save();
    res.send("hello");
    
  } catch (e) {
    res.status(500).send();
  }
  */
  console.log("Logout");
  res.clearCookie("gate", { path: "/" });
  res.status(200).send("User Logout");
});

//logout from all devices
router.post("/students/logoutAll", studentAuth, async (req, res) => {
  try {
    req.student.tokens = [];
    await req.student.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

//view my profile
router.get("/students/dashboard", studentAuth, async (req, res) => {
  res.status(200).send(req.student);
});

// find-my-course
router.post("/find/my/course", studentAuth, async (req, res) => {
  console.log(req.body.email);
  try {
    let data = await Course.find({ student: req.body.email });
    let ratingInfo = [];

    for (i = 0; i < data.length; i++) {
      const rating = await Rating.find({ student: data[i].student });
      console.log(rating);
      // const data1 = Object.assign(data[0], { rating: rating[0].rating });
      // data[i] = data1;
      ratingInfo.push(rating[i].rating);
    }
    console.log(ratingInfo);

    res.status(200).json({ data, ratingInfo });
  } catch (e) {
    console.log(e.message);
    res.status(402).json({ message: "error" });
  }
});

router.get("/checkLogin", studentAuth, async (req, res) => {
  if (req.student) {
    res.status(200).send(true);
  } else {
    res.status(200).send(false);
  }
});

router.get("/checkLogin/system", tutorAuth, async (req, res) => {
  if (req.user === 1) {
    res.status(200).send("1");
  } else if (req.user === 2) {
    res.status(200).send("2");
  } else {
    res.status(200).send("0");
  }
  console.log("I am here");
});

//update a student by id
router.patch("/students/me", studentAuth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "name",
    "email",
    "password",
    "phone",
    "address",
    "hired_or_not",
    "school",
    "gender",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates" });
  }

  try {
    updates.forEach((update) => {
      req.student[update] = req.body[update];
    });

    await req.student.save();
    res.status(202).send(req.student);
  } catch (e) {
    res.status(400).send(e);
  }
});

//delete a student by id
router.delete("/students/me", studentAuth, async (req, res) => {
  try {
    await req.student.remove();
    res.send(req.student);
  } catch (e) {
    res.status(500).send(e);
  }
});
const upload = multer({
  // storage: storage,
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload a image"));
    }
    cb(undefined, true);
  },
});

//profile pic
router.post(
  "/students/me/avatar",
  studentAuth,
  upload.single("myImage"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.student.avatar = buffer;
    console.log(buffer);
    await req.student.save();
    res.status(200).json("Success");
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);
//delete profile pic
router.delete("/students/me/avatar", studentAuth, async (req, res) => {
  req.student.avatar = undefined;
  await req.student.save();
  res.send();
});

//fetch profile picture
router.get("/students/:id/avatar", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student || !student.avatar) {
      throw new Error("Profile Image Not Found");
    }

    res.set("Content-Type", "image/png");
    res.send(student.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

router.post("/hire/tutor", studentAuth, async (req, res) => {
  try {
    const tutor = await Tutor.findOne({ email: req.body.tutor });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "gateofficial.nepal@gmail.com",
        pass: "gate123@@@",
      },
    });
    var mailOptions = {
      from: "gateofficial.nepal@gmail.com",
      to: req.body.tutor,
      subject: "New Student Request",
      // text: `Hi Smartherd, thank you for your nice Node.js tutorials.
      //     I will donate 50$ for this course. Please send me payment options.`,
      html:
        "<h1>Hi " +
        tutor.name +
        `, <br />You have a new request from a student named ${req.student.name} ,</h1><p>Student Detail</p><ul><li>Name: ${req.student.name}</li><li>Email: ${req.student.email}</li><li>Phone: ${req.student.phone}</li></ul>`,
    };

    console.log("hello");

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    console.log("hi");
    res.status(200).json({ message: "Success" });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.post("/students/googleLogin", async (req, res) => {
  const { tokenId } = req.body;
  client
    .verifyIdToken({
      idToken: tokenId,
      audience:
        "702118801258-qsne30uenciqf1fk16f3ddnjelhemo9u.apps.googleusercontent.com",
    })
    .then(async (response) => {
      const { email_verified, name, email } = response.payload;
      if (email_verified) {
        try {
          const student = await Student.findOne({ email: email });
          console.log(student);

          if (student && student.idType === "google") {
            const token = await student.generateAuthToken();
            console.log("student present");
            res.cookie("gate", token, {
              expires: new Date(Date.now() + 25892000000),
              httpOnly: true,
            });
            res.status(200).send({ student, token });
          } else if (student && student.idType === "email") {
            res.status(400).send({ errorMsg: "Error" });
          } else {
            try {
              console.log("2");
              const student = new Student({
                name: name,
                email: email,
                hired_or_not: false,
                idType: "google",
              });
              await student.save();
              const token = await student.generateAuthToken();

              res.cookie("gate", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true,
              });

              res.status(201).send({ student, token });
              //sending emails
              var transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  user: "gateofficial.nepal@gmail.com",
                  pass: "gate123@@@",
                },
              });
              var mailOptions = {
                from: "gateofficial.nepal@gmail.com",
                to: student.email,
                subject: "Welcome To GATE",
                // text: `Hi Smartherd, thank you for your nice Node.js tutorials.
                //     I will donate 50$ for this course. Please send me payment options.`,
                html:
                  "<h1>Hi " +
                  student.name +
                  ",Welcome to Gate.</h1><p> You are all set. Now you can find Tutors as per your requiremts. <br> Thank You</p>",
              };

              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Email sent: " + info.response);
                }
              });

              //ontinue
            } catch (e) {
              console.log(e);
              res.status(400).send(e);
            }
          }
        } catch (e) {
          console.log(e);
          res.status(400).send(e);
        }
      } else {
        console.log("error");
      }
    });
});

// change rating
router.post("/change/rating", studentAuth, async (req, res) => {
  try {
    const rate = req.body.rate;
    const tutor = req.body.tutor;
    const student = req.body.student;
    const data = await Rating.find({
      tutor,
      student,
    });
    if (data[0]) {
      const ratingData = await Rating.findOneAndUpdate(
        { student: student, tutor: tutor },
        {
          rating: rate,
        }
      );
      res.status(200).send(ratingData);
    } else {
      const rating = await new Rating({
        tutor: tutor,
        student: student,
        rating: rate,
      });
      await rating.save();
      res.status(200).send(rating);
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "failed" });
  }
});

router.post("/call/rating", studentAuth, async (req, res) => {
  try {
    const student = req.body.student;
    const data = await Rating.find();
    console.log(data);
    res.status(200).json(data);
  } catch (e) {
    res.status(400).json({ message: "failed" });
  }
});

module.exports = router;
