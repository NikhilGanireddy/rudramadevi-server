const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  hallTicket: {
    type: String,
    unique: true
  },
  room: {
    type: String,
    default: "b42"
  },
  year: {
    type: String,
    default: "Final Year"
  },
  batch: {
    type: String,
    default: "2020-24"
  },
  branch: {
    type: String,
    default: "CSE"
  },
  mobile: {
    type: Number,
    default: 9876543210
  },
  motherName: {
    type: String,
    default: "Mother Name"
  },
  motherMobile: {
    type: Number,
    default: 123456789
  },
  fatherName: {
    type: String,
    default: "Father Name"
  },
  fatherMobile: {
    type: Number,
    default: 123456789
  },
  address: {
    type: String,
    default: 99
  },
  pic: {
    type: String,
    default:
      "https://e1.pxfuel.com/desktop-wallpaper/45/590/desktop-wallpaper-one-piece-luffy-computer.jpg"
  },
  password: String
});

const UserModel = mongoose.model("HostelUser", UserSchema);

module.exports = UserModel;
