const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");
const multer = require("multer");
require("dotenv").config();

const User = require("./models/User");
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["https://rudramadevi.netlify.app", "http://localhost:5173"],
  })
);
app.use(cookieparser());

mongoose.connect(process.env.MONGOURL);
const jwtsecret = "lkdsfnbwlkskjthwkvebtrwldlnmvnsldzgcnxlc";
const photosMiddlewear = multer({
  dest: "uploads/",
});

app.get("/test", (req, res) => {
  res.json("server is working");
});

app.post("/login", async (req, res) => {
  const { name, hallTicket, password } = req.body;
  const userDoc = await User.findOne({ hallTicket });
  if (userDoc) {
    if (userDoc.name == name && userDoc.password == password) {
      jwt.sign(
        {
          name: userDoc.name,
          id: userDoc._id,
          hallTicket: userDoc.hallTicket,
          pic: userDoc.pic,
          branch: userDoc.branch,
          year: userDoc.year,
          room: userDoc.room,
          password: userDoc.password,
        },
        jwtsecret,
        {},
        (err, token) => {
          if (err) throw err;
          else res.cookie("token", token).json(userDoc);
        }
      );
    }
  } else res.json(`User with the hallticket ${hallTicket} is not found`);
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtsecret, {}, async (err, tokendata) => {
      if (err) throw err;
      const { name, hallTicket, id, pic, branch, year, room } =
        await User.findById(tokendata.id);
      res.json({ name, hallTicket, id, pic, branch, year, room });
    });
  } else res.json(null);
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload", photosMiddlewear.array("photo", 1), (req, res) => {
  console.log(req.files);
  res.json(req.files);
});

app.post("/user/change-password", (req, res) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  res.json({ currentPassword, newPassword, confirmNewPassword });
});

app.listen(port);
