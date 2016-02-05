var mongoose = require("mongoose");

var studentSchema = mongoose.Schema({
  name: String,
  traits: Array
});

module.exports = mongoose.model("Student", studentSchema);