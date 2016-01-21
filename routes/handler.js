var path = require('path');
var Student = require('./../models/studentModel.js');

var routes = {};


routes.handlerGET = function(req, res) {
  if (req.xhr) {
      var name = req.query.name;

      if (req.query.adddrop === "add") {
         var bob = new Student({name: req.query.name});
          bob.save(function (err) {
            if (err) {
              console.log("Problem saving", err);
            }
          });
        res.send(req.query.name);
      }
      else if (req.query.adddrop === "drop") {
        Student.find({name: name}).remove().exec();
        res.send(name);
      }
  }
};

routes.makegroupsGET = function(req, res) {
  if (req.xhr) {
    Student.find()
    .exec(function(err, students) {
      var list = [];
      var num = req.query.num;
      var numtype = req.query.numtype;
      for (var i=0; i<students.length; i++) {
        list.push(students[i].name);
      }

      var numgroups = 1;
      if (numtype === "groupsize") {
         numgroups = Math.floor(list.length / parseInt(num));
      }
      else if (numtype === "numgroups") {
        numgroups = parseInt(num);
      }

      var groups = [];
      for (var i=0; i<numgroups; i++) {
        groups.push([]);
      }

      var groupindex = 0;

      while (list.length > 0) {
        var studindex = Math.floor(Math.random()*list.length);
        groups[groupindex].push(list[studindex]);
        groupindex++;
        if (groupindex>=numgroups) {
          groupindex = 0;
        }
        list.splice(studindex, 1);
      }
      res.send(groups);
    });
  }
};

routes.getlistGET = function(req, res) {
  Student.find()
  .sort({name: 1})
  .exec(function(err, students) {
    var list = [];
    for (var i=0; i<students.length; i++) {
      //console.log(students[i].name);
      list.push(students[i].name);
    }
    res.send(list);
  });
};

module.exports = routes;