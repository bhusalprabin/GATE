const express = require("express");
require("./db/mongoose");
const cookieParser = require("cookie-parser");
const studentRouter = require("./routers/student");
const tutorRouter = require("./routers/tutor");
const courseRouter = require("./routers/course");
const adminRouter = require("./routers/admin");
const router = require("./routers/admin");
const AdminMessage = require("./models/adminstudent");
const app = express();
const port = process.env.PORT || 5000;

const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentails: true,
  },
});

app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb" }));
app.use(cookieParser());

app.use(adminRouter);
app.use(studentRouter);
app.use(tutorRouter);
app.use(courseRouter);

// message

app.get("/list", (req, res) => {
  AdminMessage.find()
    .sort({ createdAt: -1 })
    .limit(8)
    .then((rslt) => res.json(rslt));
});

io.on("connection", (socket) => {
  console.log("new client connceted");
  socket.emit("connection", null);
  socket.on("new-msg", async ({ username, message }) => {
    const newMsg = await new AdminMessage({
      username,
      message,
    });
    await newMsg.save();

    socket.emit("message", { username, message });
  });
});

http.listen(port, () => {
  console.log("Server is up on port" + port);
});
