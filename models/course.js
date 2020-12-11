var mongoose = require("mongoose");

var courseSchema = mongoose.Schema({
  CName: String,
  Cid: String,
  CDuration: String,
  CFee: String

});
const Course = mongoose.model("Course", courseSchema);
module.exports = Course;