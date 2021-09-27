require("../src/db/mongoose");
const Course = require("../src/models/course");

// Student.findByIdAndUpdate("606ef2640d0e7119c3a32669", {
//   name: "Priyansha",
//   hired_or_not: false,
// })
//   .then((student) => {
//     console.log(student);
//     return Student.countDocuments({ hired_or_not: false });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

Course.findByIdAndDelete("607918fc7a3e295a088869e7")
  .then((course) => {
    console.log(course);
    return Course.countDocuments({ level: "bacholers 1st year" });
  })
  .then((course) => {
    console.log(course);
  })
  .catch((e) => {
    console.log(e);
  });
