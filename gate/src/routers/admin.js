const express = require("express");
const Admin = require("../models/admin");
const router = new express.Router();
const adminAuth = require("../middleware/adminAuth");
const Tutor = require("../models/tutor");
const Student = require("../models/student");
const Course = require("../models/course");
const SubjectData = require("../models/subjects");
const SubjectList = require("../models/subjectList");
const AdminStudentMessage = require("../models/adminstudent");
const Rating = require("../models/rating");
const nodemailer = require("nodemailer");

// create admin
router.post("/admin/signup", async (req, res) => {
  if (Admin.findOne(req.body.email)) {
    console.log("email already used");
  }
  const admin = new Admin(req.body);

  try {
    await admin.save();
    const token = await admin.generateAuthToken();

    res.cookie("gate", token, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true,
    });

    res.status(201).send({ admin, token });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

//login admin
router.post("/admin/login", async (req, res) => {
  try {
    const admin = await Admin.findByCredentials(
      req.body.name,
      req.body.password
    );

    const token = await admin.generateAuthToken();

    res.cookie("gate", token, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true,
    });
    //must pass as object
    res.status(200).send({ admin, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// admin dash
router.get("/admin/dashboard", adminAuth, async (req, res) => {
  res.status(200).send(req.admin);
});

// tutors data
router.get("/admin/tutors", adminAuth, async (req, res) => {
  try {
    const number = parseInt(req.query.number);
    const user = req.query.user;

    console.log(number);

    if (!number) {
      number = 10;
    }

    if (user === "undefined") {
      const tutors = await Tutor.find().sort({ name: 1 }).limit(number);
      console.log(tutors);
      res.status(200).send(tutors);
    } else {
      const tutors = await Tutor.find({
        name: { $regex: user },
      }).limit(number);
      console.log(tutors);
      res.status(200).send(tutors);
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// delete tutor records
router.delete("/admin/tutors", adminAuth, async (req, res) => {
  try {
    await Tutor.findByIdAndDelete(req.query._id);
    res.status(200).json({ message: "success" });
  } catch (e) {
    res.status(200).json({ message: "Failed" });
  }
});

router.get("/admin/tutors-profile", adminAuth, async (req, res) => {
  try {
    const data = await Tutor.findById(req.query._id);
    res.status(200).send(data);
    console.log(data);
  } catch (e) {
    res.status(401).json({ message: "Failed" });
  }
});

// students data
router.get("/admin/students", adminAuth, async (req, res) => {
  try {
    const number = parseInt(req.query.number);
    const user = req.query.user;

    console.log(number);

    if (!number) {
      number = 10;
    }

    if (user === "undefined") {
      const students = await Student.find().sort({ name: 1 }).limit(number);
      console.log(students);
      res.status(200).send(students);
    } else {
      const students = await Student.find({
        name: { $regex: user },
      }).limit(number);
      console.log(students);
      res.status(200).send(students);
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// delete tutor records
router.delete("/admin/students", adminAuth, async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.query._id);
    res.status(200).json({ message: "success" });
  } catch (e) {
    res.status(200).json({ message: "Failed" });
  }
});

router.get("/admin/student-profile", adminAuth, async (req, res) => {
  try {
    const data = await Student.findById(req.query._id);
    res.status(200).send(data);
    console.log(data);
  } catch (e) {
    res.status(401).json({ message: "Failed" });
  }
});

// course detail

router.get("/admin/course", adminAuth, async (req, res) => {
  try {
    const number = parseInt(req.query.number);
    const user = req.query.user;

    console.log(number);

    if (!number) {
      number = 10;
    }

    if (user === "undefined") {
      const course = await Course.find().sort({ name: 1 }).limit(number);
      console.log(course);
      res.status(200).send(course);
    } else {
      const course = await Course.find({
        $or: [{ tutor: { $regex: user } }, { student: { $regex: user } }],
      }).limit(number);
      console.log(course);
      res.status(200).send(course);
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// delete tutor records
router.delete("/admin/course", adminAuth, async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.query._id);
    res.status(200).json({ message: "success" });
  } catch (e) {
    res.status(200).json({ message: "Failed" });
  }
});

// verify tutor
// tutors data
router.get("/admin/tutors", adminAuth, async (req, res) => {
  try {
    const number = parseInt(req.query.number);
    const user = req.query.user;

    console.log(number);

    if (!number) {
      number = 10;
    }

    if (user === "undefined") {
      const tutors = await Tutor.find().sort({ name: 1 }).limit(number);
      console.log(tutors);
      res.status(200).send(tutors);
    } else {
      const tutors = await Tutor.find({
        name: { $regex: user },
      }).limit(number);
      console.log(tutors);
      res.status(200).send(tutors);
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// delete tutor records
router.delete("/admin/tutors", adminAuth, async (req, res) => {
  try {
    await Tutor.findByIdAndDelete(req.query._id);
    res.status(200).json({ message: "success" });
  } catch (e) {
    res.status(200).json({ message: "Failed" });
  }
});

router.get("/admin/tutors-profile", adminAuth, async (req, res) => {
  try {
    const data = await Tutor.findById(req.query._id);
    res.status(200).send(data);
    console.log(data);
  } catch (e) {
    res.status(401).json({ message: "Failed" });
  }
});

// tutor data
router.get("/admin/verify", adminAuth, async (req, res) => {
  try {
    const number = parseInt(req.query.number);
    const user = req.query.user;

    console.log(number);

    if (!number) {
      number = 10;
    }

    if (user === "undefined") {
      const tutor = await Tutor.find({
        verify: "pending",
      })
        .sort({ name: 1 })
        .limit(number);
      console.log(tutor);
      res.status(200).send(tutor);
    } else {
      const tutor = await Tutor.find({
        verify: "pending",
        name: { $regex: user },
      }).limit(number);
      console.log(tutor);
      res.status(200).send(tutor);
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// reject tutor
router.patch("/admin/reject", adminAuth, async (req, res) => {
  try {
    Tutor.findByIdAndUpdate(
      req.query._id,
      { verify: "rejected" },
      function (err, docs) {
        if (err) {
          res.status(400).send(e.message);
        } else {
          res.status(200).json({ message: "success" });
        }
      }
    );
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// verify tutor
router.patch("/admin/verified", adminAuth, async (req, res) => {
  try {
    Tutor.findByIdAndUpdate(
      req.query._id,
      { verify: "true" },
      function (err, docs) {
        if (err) {
          res.status(400).send(e.message);
        } else {
          res.status(200).json({ message: "success" });
        }
      }
    );
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// subjects
router.get("/admin/subject", adminAuth, async (req, res) => {
  try {
    const number = parseInt(req.query.number);
    const user = req.query.user;

    console.log(number);

    if (!number) {
      number = 10;
    }

    if (user === "undefined") {
      const subjects = await SubjectData.find({
        approved: "pending",
      })
        .sort({ name: 1 })
        .limit(number);
      console.log(subjects);
      res.status(200).send(subjects);
    } else {
      const subjects = await SubjectData.find({
        name: { $regex: user },
        verify: "pending",
      }).limit(number);
      console.log(subjects);

      res.status(200).send(subjects);
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// reject subject
router.patch("/admin/reject-subject", adminAuth, async (req, res) => {
  try {
    SubjectData.findByIdAndUpdate(
      req.query._id,
      { approved: "rejected" },
      function (err, docs) {
        if (err) {
          res.status(400).send(e.message);
        } else {
          res.status(200).json({ message: "success" });
        }
      }
    );
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// create new subject
router.post("/admin/approve-subject", async (req, res) => {
  try {
    console.log(req.body);
    const subjectName = req.body.course_name;
    const tutor = req.body.tutor;
    const subjectList = await SubjectList({
      subjectName: req.body.course_name,
      value: req.body.course_id,
    });
    subjectList.save();

    SubjectData.findByIdAndUpdate(
      req.body._id,
      { approved: "true" },
      function async(err, docs) {
        if (err) {
          res.status(400).send(e.message);
        } else {
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
            to: tutor,
            subject: "Course Approval",

            html:
              "<h1>Hi " +
              tutor +
              `,Your course ${subjectName} have been approved `,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
          res.status(200).json({ message: "success" });
        }
      }
    );
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get("/subjects", async (req, res) => {
  console.log("hello");
  try {
    const data = await SubjectList.find();
    console.log(data);
    res.status(200).send(data);
  } catch (e) {
    console.log("e");
    res.status(400).send(e);
  }
});

router.get("/get/rating/info", async (req, res) => {
  try {
    if (!req.query) {
      console.log("empty");
      return res.send("Invalid request");
    }

    console.log(req.query);

    const price = req.query.price;

    let searchdata = {
      subjects: "",
      address: "",
      level: "",
      gender: "",
      status: "",
      price: "",
    };

    let o = Object.fromEntries(
      Object.entries(searchdata).filter(([_, v]) => v != "")
    );

    const tutors = await Tutor.find(o).limit(10);

    const ratingData = await Rating.find();
    let info = [];
    let rateSingle = 0;
    let no = 0;
    const ratingInfo = [];

    for (let i = 0; i < tutors.length; i++) {
      for (let j = 0; j < ratingData.length; j++) {
        if (ratingData[j].tutor === tutors[i].email) {
          rateSingle = rateSingle + ratingData[j].rating;
          no++;
        }
        info.push(rateSingle);
        ratingData = 0;
        no = 0;
      }
    }

    console.log(info);

    res.status(200).send(info);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/getalldata", async (req, res) => {
  console.log("hello");
  try {
    let number90;
    let number30;
    let number1;
    let number = [];
    let user = [];
    let gender = [];

    var todayDate = new Date().toISOString().slice(0, 10);

    const student90 = await Student.find({
      createdAt: {
        $gte: new Date("2010-04-29T00:00:00.000Z"),
        $lt: new Date("2021-09-26T00:00:00.000Z"),
      },
    });

    const tutor90 = await Tutor.find({
      createdAt: {
        $gte: new Date("2010-04-29T00:00:00.000Z"),
        $lt: new Date("2021-09-26T00:00:00.000Z"),
      },
    });
    let ts90 = student90.length;
    let tt90 = tutor90.length;
    number90 = ts90 + tt90;

    const student30 = await Student.find({
      createdAt: {
        $gte: new Date("2021-08-25T00:00:00.000Z"),
        $lt: new Date("2021-09-26T00:00:00.000Z"),
      },
    });

    const tutor30 = await Tutor.find({
      createdAt: {
        $gte: new Date("2021-08-25T00:00:00.000Z"),
        $lt: new Date("2021-09-26T00:00:00.000Z"),
      },
    });
    number30 = student30.length + tutor30.length;
    const student1 = await Student.find({
      createdAt: {
        $gte: new Date("2021-08-25T00:00:00.000Z"),
        $lt: new Date("2021-09-26T00:00:00.000Z"),
      },
    });

    const tutor1 = await Tutor.find({
      createdAt: {
        $gte: new Date("2021-09-25T00:00:00.000Z"),
        $lt: new Date("2021-09-26T00:00:00.000Z"),
      },
    });
    number1 = student1.length + tutor1.length;
    if (number90 === null) number90 = 0;
    if (number30 === null) number30 = 0;
    if (number1 === null) number1 = 0;

    number = [number90, number30, number1];

    let maleStudent = await Student.find({ gender: "male" });
    let femaleStudent = await Student.find({ gender: "female" });
    let unknownGenderStudent = await Student.find({ gender: "" });

    let maleTutor = await Tutor.find({ gender: "male" });
    let femaleTutor = await Tutor.find({ gender: "female" });
    let unknownGenderTutor = await Tutor.find({ gender: "" });

    gender = [
      maleStudent.length + maleTutor.length,
      femaleStudent.length + femaleTutor.length,
      unknownGenderStudent.length + unknownGenderTutor.length,
    ];

    let studentData = await Student.find();
    let tutorData = await Tutor.find();

    user = [studentData.length, tutorData.length];
    console.log(number, gender, user);
    res.status(200).json({ number: number, gender: gender, user: user });
  } catch (e) {
    console.log(e.message);
    res.status(400).send(e);
  }
});

module.exports = router;
