'use strict';
exports.list_all_attendance = function(req, res) {


  var auth_url = mc_api + "attendance/";
  if (req.session.role == "Student"){
    auth_url = auth_url + req.session.email;
  }

  request(auth_url, function (error, response, body) {
    var attendance = JSON.parse(body);

    var arr = req.session;
    res.render("attendance", {menus, attendance, arr, monthNames});
    //console.log('error:', error); // Print the error if one occurred
    //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //console.log('body:', body); // Print the HTML for the Google homepage.
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
