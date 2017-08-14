'use strict';
exports.list_all_attendance = function(req, res) {

  if (req.session.email == undefined){
    res.render("login");
  }else{
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
  }
};

exports.add_attendance = function(req, res) {
  if (req.session.email == undefined){
    res.render("login");
  }
};

exports.get_attendance = function(req, res) {
  if (req.session.email == undefined){
    res.render("login");
  }
};

exports.update_attendance = function(req, res) {
  if (req.session.email == undefined){
    res.render("login");
  }

};

exports.delete_attendance = function(req, res) {
  if (req.session.email == undefined){
    res.render("login");
  }

};
