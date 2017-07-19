'use strict';
exports.list_all_attendance = function(req, res) {
  Attendance.find({}, function(err, attendance) {
    if (err)
      res.send(err);
      res.json(attendance);
  });
};

exports.add_attendance = function(req, res) {
  var new_attendance = new Attendance(req.body);
  new_attendance.save(function(err, attendance) {
    if (err)
      res.send(err);
      res.json(attendance);
  });
};

exports.get_attendance = function(req, res) {
  Attendance.find({email: req.params.email, att_id: req.params.att_id}, function(err, attendance) {
    if (err)
      res.send(err);
      res.json(attendance);
  });
};

exports.update_attendance = function(req, res) {
  Attendance.findOneAndUpdate({email: req.params.email, att_id: req.params.att_id}, req.body, {new: true}, function(err, attendance) {
    if (err)
      res.send(err);
      res.json(attendance);
  });
};

exports.delete_attendance = function(req, res) {
  Attendance.findOneAndUpdate({email: req.params.email, att_id: req.params.att_id}, req.body, {new: true}, function(err, attendance) {
    if (err)
      res.send(err);
      res.json({message: 'Attendance successfully deactivated'});
  });
};
