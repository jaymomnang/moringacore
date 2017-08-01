'use strict';
exports.getCurrentUser = function(req, res) {
    //if (arr.loggedIn != false){
    //  res.redirect(urlpath + "tasks");
    //}else{
    //  res.render("login");
    //}
    res.render("login");
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
        'role': info[0].role,
      };
      //prepare attendance data
      var att_data = {email: arr.email, fullname: arr.username, year: token.year, month: token.month,
                      day: token.day, time: token.time, att_id: token.nxt_att_Id, gradepoint: hh};

      logAttendance(att_data);      
      res.redirect(urlpath + "tasks");
    }
  });
};

//log the attendance register for student
var logAttendance = function(data){
  var auth_url = mc_api + "attendance/";
  request.post({headers: {'content-type': 'application/x-www-form-urlencoded'}, url: auth_url, form:data }, function(error, response, body){
    var data = JSON.parse(body);
    token.attendanceLogged = true;
    token.attendance = data;
  });
};
