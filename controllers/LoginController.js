'use strict';
exports.getCurrentUser = function(req, res) {
    console.log("error caused by: REDIRECT");
    if (arr.loggedIn != false){
      res.redirect("tasks");
    }else{
      res.render("login");
    }
};

exports.authenticate = function(req, res) {
  var auth_url = mc_api + "login/"+ req.body.email + "/" + req.body.pwd;
  request(auth_url, function (error, response, body) {
    var info = JSON.parse(body);
    if (info.length != 1){
      res.render("login", {statusCode: response && response.statusCode, loggedIn: false});
    }
    if(info.length == 1){
      //prepare display data
      arr = {
        'username': info[0].firstname + " " + info[0].lastname,
        'email': info[0].email,
        'status': info[0].status,
        'loggedIn': true,
        'body': info[0],
        'body': info[0].role,
      };

      //prepare attendance data
      var _time = hh + ' ' + mm + ' ' + ss;
      var att_data = {email: arr.email, fullname: arr.firstname + ' ' + arr.lastname,
                      year: arr.year, month: arr.month, day: arr.day, time: _time,
                      att_id: getNewAttendanceId, gradepoint: 5};

      logAttendance(req, res, att_data);
      console.log("error caused by: REDIRECT AGAIN");
      res.redirect("/tasks");
    }
    //console.log('error:', error); // Print the error if one occurred
    //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //console.log('body:', body); // Print the HTML for the Google homepage.
  });
};

//internally generated numbers for attendance records.
var getNewAttendanceId = function(){
  var auth_url = mc_api + "attendance/get";
  request(auth_url, function (error, response, body) {
    var info = JSON.parse(body);
    var attId = "ATT0000001";
    if (info.length != 1){
      return attId;
    }
    if(info.length == 1){

      var pos = Number(info[0].att_id.substring(3,10)) + 1;
      var nxt = "ATT000000";
      switch(pos.toString().length) {
          case 2:
              nxt = "ATT00000" + pos.toString();
              break;
          case 3:
              nxt = "ATT0000" + pos.toString();
              break;
          case 4:
              nxt = "ATT000" + pos.toString();
              break;
          case 5:
              nxt = "ATT00" + pos.toString();
              break;
          case 6:
              nxt = "ATT0" + pos.toString();
              break;
          case 7:
              nxt = "ATT" + pos.toString();
              break;
          default:
              nxt = nxt + pos.toString();
      }
      return nxt;
    }
  });
};

//log the attendance register for student
var logAttendance = function(req, res, data){
  var auth_url = mc_api + "attendance/get";
  var r = request.post(auth_url, {form:data});
  //email, fullname, year, month, day, time, att_id, gradepoint
};
