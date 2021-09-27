const express = require("express");
const Tutor = require("../models/tutor");
const tutorAuth = require("../middleware/tutorAuth");
const studentAuth = require("../middleware/studentAuth");
const router = new express.Router();
const multer = require("multer");
const nodemailer = require("nodemailer");
const sharp = require("sharp");
const store = require("../utility/upload-config");
const path = require("path");
const Course = require("../models/course");
const Student = require("../models/student");

const Subject = require("../models/subjects");

//create a tutor
router.post("/tutors", async (req, res) => {
  const tutor = new Tutor(req.body);
  try {
    await tutor.save();
    const token = await tutor.generateAuthToken2();

    res.cookie("gate", token, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true,
    });

    res.status(200).send({ tutor, token });
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
      to: tutor.email,
      subject: "New Tutor Registration",
      // text: `Hi Smartherd, thank you for your nice Node.js tutorials.
      //     I will donate 50$ for this course. Please send me payment options.`,
      html:
        "<h1>Hi " +
        tutor.name +
        ",Welcome to Gate.</h1><p> You are all set. Now you can get connected to your students. <br> Thank You</p>",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    //continue
  } catch (e) {
    res.status(400).send(e);
  }
});

//login tutor
router.post("/tutors/login", async (req, res) => {
  try {
    const tutor = await Tutor.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await tutor.generateAuthToken2();
    res.cookie("gate", token, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true,
    });

    res.status(200).send({ tutor, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

//logout tutor
router.post("/tutors/logout", tutorAuth, async (req, res) => {
  try {
    req.tutor.tokens = req.tutor.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.tutor.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

//logout from all devices
router.post("/tutors/logoutAll", tutorAuth, async (req, res) => {
  try {
    req.tutor.tokens = [];
    await req.tutor.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

//profile
router.get("/tutors/me", tutorAuth, async (req, res) => {
  res.status(201).send(req.tutor);
});

//Get all Tutors by (STUDENTS)
router.get("/tutorsAll", async (req, res) => {
  try {
    const tutors = await Tutor.find();
    res.send(tutors);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//Get all Tutors by (STUDENTS)
router.get("/tutorsAll1", studentAuth, async (req, res) => {
  try {
    const tutors = await Tutor.find();
    res.send(tutors);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//Get Filtered Tutors by (STUDENTS)
router.get("/tutors/filtered", async (req, res) => {
  try {
    if (!req.query) {
      console.log("empty");
      return res.send("Invalid request");
    }

    console.log(req.query);

    const price = req.query.price;

    let searchdata = {
      subjects: req.query.subject,
      address: req.query.location,
      level: req.query.level,
      gender: req.query.gender,
      status: req.query.status,
      verify: req.query.verify,
      price:
        req.query.price !== "undefined"
          ? { $gte: price - 200, $lte: price + 200 }
          : { $gte: 100, $lte: 5000 },
    };

    let o = Object.fromEntries(
      Object.entries(searchdata).filter(([_, v]) => v != "")
    );

    const tutors = await Tutor.find(o).limit(10);

    res.status(200).send(tutors);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//Get Filtered by email Tutors by (STUDENTS)
router.get("/tutors/filteredbyemail", async (req, res) => {
  try {
    if (!req.query) {
      console.log("empty");
      return res.send("Invalid request");
    }
    const tutors = await Tutor.find({
      email: req.query.user,
    });
    res.status(200).send(tutors);
  } catch (e) {
    res.status(400).send(e.message);
  }
});
//update tutor profile
router.patch("/tutors/me", tutorAuth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "name",
    "email",
    "password",
    "phone",
    "address",
    "gender",
    "level",
    "subjects",
    "avatar",
    "tagline",
    "bio",
    "price",
    "status",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates" });
  }

  try {
    updates.forEach((update) => {
      req.tutor[update] = req.body[update];
    });

    await req.tutor.save();

    res.status(202).send(req.tutor);
  } catch (e) {
    res.status(400).send(e);
  }
});

// find-my-course
router.post("/find/my/course/tutor", tutorAuth, async (req, res) => {
  console.log(req.body.email);
  try {
    let data = await Course.find({ tutor: req.body.email });
    res.status(200).json(data);
  } catch (e) {
    console.log(e.message);
    res.status(402).json({ message: "error" });
  }
});

//delete tutor profile
router.delete("/tutors/me", tutorAuth, async (req, res) => {
  try {
    await req.tutor.remove();
    res.send(req.tutor);
  } catch (e) {
    res.status(500).send(e);
  }
});

// storage for profile img

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

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
  "/tutors/me/avatar",
  tutorAuth,
  upload.single("myImage"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.tutor.avatar = buffer;
    console.log(buffer);
    await req.tutor.save();
    res.status(200).json("Success");
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.post(
  "/tutors/me/certificate",
  tutorAuth,
  upload.single("myImage"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.tutor.certificate = buffer;
    req.tutor.verify = "pending";
    console.log(buffer);
    await req.tutor.save();
    res.status(200).json("Success");
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

//delete profile pic
router.delete("/tutors/me/avatar", tutorAuth, async (req, res) => {
  req.tutor.avatar = undefined;
  await req.tutor.save();
  res.send();
});

//fetch profile picture
router.get("/tutors/:id/avatar", async (req, res) => {
  try {
    const tutor = await tutor.findById(req.params.id);

    if (!tutor || !tutor.avatar) {
      throw new Error("Profile Image Not Found");
    }

    res.set("Content-Type", "image/png");
    res.send(tutor.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

// var transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "gateofficial.nepal@gmail.com",
//     pass: "gate123@@@",
//   },
// });

// var mailOptions = {
//   from: "gateofficial.nepal@gmail.com",
//   to: "pawan.kharel360@gmail.com",
//   subject: "Sending Email using Node.js",
//   text: `Hi Smartherd, thank you for your nice Node.js tutorials.
//           I will donate 50$ for this course. Please send me payment options.`,
//   // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'
// };

// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Email sent: " + info.response);
//   }
// });

//  add course
router.post("/tutors/addcourse", async (req, res) => {
  const data = await Subject.find({
    course_id: req.body.course_id,
  });

  if (data.length === 0) {
    const record = new Subject(req.body);
    console.log(record);
    await record.save();
    res.status(201).json("success");
  } else {
    console.log("duplicate");
    res.status(205).json("Duplicate");
  }
});

// aprove courses
router.post("/approve/new/student", tutorAuth, async (req, res) => {
  try {
    const id = req.body._id;
    const student = req.body.student;

    const course = await Course.findByIdAndUpdate(id, {
      approveByTutor: "true",
    });

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
      to: student,
      subject: "Course Approval",

      html:
        "<h1>Hi " +
        `,Your course request for ${course.subjectName} is approved by tutor. <br> Thank You</p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.status(200).json({ message: "ok" });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/decline/new/student", tutorAuth, async (req, res) => {
  try {
    const id = req.body._id;
    const student = req.body.student;

    const course = await Course.findByIdAndUpdate(id, {
      approveByTutor: "rejected",
    });

    // const courseData = await Course.findById(id);

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
      to: student,
      subject: "Course Not Approval",

      html:
        "<h1>Hi " +
        `,Your course request for ${course.subjectName} is declined by tutor. <br> Thank You</p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error.message);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(200).json({ message: "ok" });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/student/forget/pass", async (req, res) => {
  const student = req.body.student;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gateofficial.nepal@gmail.com",
      pass: "gate123@@@",
    },
  });
  var mailOptions = {
    from: "gateofficial.nepal@gmail.com",
    to: student,
    subject: "Rest Password",

    html:
      "<h1>Hi " +
      `,Your password reset link : http://localhost:3000/student/rest/pass?email=${student}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

router.post("/student/forget/confirm", async (req, res) => {
  try {
    const student = req.body.student;
    const pass = req.body.password;
    const studentData = await Student.findOneAndUpdate(
      { email: student },
      {
        password: pass,
      }
    );
    res.status(200).json(studentData);
  } catch (e) {
    res.status(400).json({ message: "failed" });
  }
});

router.post("/tutor/forget/pass", async (req, res) => {
  const tutor = req.body.tutor;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gateofficial.nepal@gmail.com",
      pass: "gate123@@@",
    },
  });
  var mailOptions = {
    from: "gateofficial.nepal@gmail.com",
    to: tutor,
    subject: "Rest Password",

    html:
      "<h1>Hi " +
      `,Your password reset link : http://localhost:3000/tutor/reset/pass?email=${tutor}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

router.post("/tutor/forget/confirm", async (req, res) => {
  try {
    const tutor = req.body.tutor;
    const pass = req.body.password;
    const studentData = await Tutor.findOneAndUpdate(
      { email: tutor },
      {
        password: pass,
      }
    );
    res.status(200).json(studentData);
  } catch (e) {
    res.status(400).json({ message: "failed" });
  }
});

router.post("/tutor/verify/email", tutorAuth, async (req, res) => {
  try {
    const tutor = req.body.tutor;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "gateofficial.nepal@gmail.com",
        pass: "gate123@@@",
      },
    });
    var mailOptions = {
      from: "gateofficial.nepal@gmail.com",
      to: tutor,
      subject: "Verify Email",

      html:
        "<h1>Hi " +
        `,Click this to verify you account : http://localhost:3000/tutor/verify/email?email=${tutor}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.status(200).json(studentData);
  } catch (e) {
    res.status(400).json({ message: "failed" });
  }
});

router.post("/tutor/final/verify", async (req, res) => {
  try {
    const tutor = req.body.tutor;
    const tutorData = await Tutor.findOneAndUpdate(
      { email: tutor },
      {
        verifyEmail: "yes",
      }
    );
    res.status(200).json(tutorData);
  } catch (e) {
    res.status(400).json({ message: "failed" });
  }
});

module.exports = router;
