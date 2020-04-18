const router = require('express').Router();

// Importing the model
const studentModel = require('../models/student');

// Students route
router.get('/', studentController.getAllStudents);
  
  // Inserts a student in the database
  router.post('/add', function(req, res) {
    var student = new studentModel({
      name: req.body.name,
      id: req.body.id,
      img: `img/${req.body.gender}.png`
    });
  
    student.save(function(err, student) {
      var result;
  
      if (err) {
        console.log(err.errors);
  
        result = { success: false, message: "Student was not created!" }
        res.send(result);
      } else {
        console.log("Successfully added student!");
        console.log(student);
  
        result = { success: true, message: "Student created!" }
  
        res.send(result);
      }
    });
  });
  
  // Finds the students matching the name query from the database and returns the array
 router.post('/search', function(req, res) {
    var pattern = "^" + req.body.name;
    studentModel.find({ name: { $regex: pattern } }, function(err, students) {
      console.log(students);
      res.send(students);
    });
  
  });
  
  // Updates a student to a set id number
  router.post('/:id/edit', function(req, res) {
    var query = {
      name: req.body.name
    };
  
    var update = {
      $set: { id: '109' }
    };
  
    studentModel.findOneAndUpdate(query, update, { new: true }, function(err, user) {
      if (err) throw err;
      console.log(user);
      res.send(user);
    });
  });
  
  module.exports = router;