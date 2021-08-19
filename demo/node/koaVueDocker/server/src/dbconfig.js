const mongoose = require("mongoose");
const URL = "mongodb://root:example@db:27017/admin";

var connect = function() {
  mongoose.connect(URL, { useNewUrlParse: true });
};
connect();
mongoose.connection.on("error", function(error) {
  if (error) {
    console.log("无法链接mongodb");
    setTimeout(connect, 5000); //5s后重新链接
  }
});

mongoose.connection.on("connected", function(error) {
  console.log("mongodb 链接成功");
});

var UserSchema = new mongoose.Schema({
  name: String,
  gender: String,
  email: String,
});

var User = mongoose.model("user", UserSchema);
// var user = new User({
//   name: "xiaohua",
//   gender: 0, //0-男，1-女
//   email: "xiaohua@126.com",
// });
// user.save(); //保存数据

module.exports = {
  User,
};
