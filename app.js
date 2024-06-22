import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import student from "./models/student.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config()
const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL)
  .then(() => app.listen(5000))
  .then(() => console.log("Server is Running..."))
  .then(() => console.log("MongoDB Connected SuccessFully!"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.send("MERN CRUD OPERATIONS RUNNING!");
});

app.use(
  cors({
      origin: ["http://localhost:3000"],
      methods: ["GET,POST,DELETE,PUT,PATCH"]
  })
);

//post data
app.post("/addstudent", (req, res, next) => {
  console.log(req.body.formData);
  const { name, rollno, college, branch } = req.body.formData;
  const s = new student({
    name,
    rollno,
    college,
    branch,
  });
  s.save();
});

//get Data
//http://localhost:5000/getstudent
app.get("/getstudent", async (req, res, next) => {
  let studentdata;
  try {
    studentdata = await student.find();
  } catch (err) {
    console.log(err);
  }
  if (!studentdata) {
    console.log("no students found");
  }
  return res.status(200).json({ studentdata });
});

//deleteData
app.delete("/deleteuser/:id", async (req, res, next) => {
  const _id = req.params.id;
  let users;
  try {
    users = await student.findByIdAndDelete(_id);
  } catch (err) {
    return console.log(err);
  }
  if (!users) {
    return { message: "Unable to delete the user" };
  }
  return { message: "Successfully deleted" };
});

//update
app.get("/getstudentbyid/:id", async (req, res, next) => {
  let studentdata;
  const _id = req.params.id;
  try {
    studentdata = await student.findById(_id);
  } catch (err) {
    console.log(err);
  }
  if (!studentdata) {
    console.log("no students found");
  }
  return res.status(200).json({ studentdata });
});

app.post("/updatestudent/:id", async (req, res, next) => {
  const id = req.params.id;
  const { name, rollno, college, branch } = req.body;
  console.log(req.body);
  await student
    .updateOne(
      { _id: id },
      {
        name,
        rollno,
        college,
        branch,
      }
    )
    .then(() => {
      res.send({ msg: "UPDATED" });
    })
    .catch((err) => {
      console.log(err);
    });
});
