const express = require("express");
const Course = require("../models/course");
const tutorAuth = require("../middleware/tutorAuth");
const studentAuth = require("../middleware/studentAuth");
const Tutor = require("../models/tutor");
const router = new express.Router();

router.post("/new/course", studentAuth, async (req, res) => {
  const courses = new Course({
    ...req.body,
    student: req.student.email,
  });
  const data = await Course.find({
    student: req.student.email,
    tutor: req.body.tutor,
  });

  try {
    if (data.length != 0) {
      console.log("matched");
      res.status(402).json({ message: "already added" });
    } else {
      console.log("success");
      await courses.save();
      res.status(201).send(courses);
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
