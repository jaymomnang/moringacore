'use strict';

exports.getCurrentUser = function(req, res) {
    //if (arr.loggedIn != false){
    //  res.redirect(urlpath + "tasks");
    //}else{
    //  res.render("login");
    //}
    req.session.destroy();
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
      createSession(req, info)
      var arr = req.session;
      //prepare attendance data
      var att_data = {email: arr.email, fullname: arr.username, year: arr.token.year, month: arr.token.month,
                      day: arr.token.day, time: arr.token.time, att_id: arr.token.nxt_att_Id, gradepoint: arr.token.hour};

      logAttendance(req, att_data);
      res.redirect(urlpath + "tasks");
    }
  });
};

//log the attendance register for student
var logAttendance = function(req, data){
  var auth_url = mc_api + "attendance/";
  request.post({headers: {'content-type': 'application/x-www-form-urlencoded'}, url: auth_url, form:data }, function(error, response, body){
    var data = JSON.parse(body);
    req.session.token.attendanceLogged = true;
    req.session.token.attendance = data;
  });
};

var createSession = function(req, info){

  req.session.email = info[0].email;
  req.session.username = info[0].firstname + " " + info[0].lastname;
  req.session.status = info[0].status;
  req.session.loggedIn = true;
  req.session.role = info[0].role;

  var d = new Date();
  var y = d.getFullYear();
  var dd = d.getDate();
  var hh = d.getHours();
  var mm = d.getMinutes();
  var ss = d.getSeconds();
  var m = d.getMonth();
  var mn = monthNames[d.getMonth()];
  var _time = hh + ':' + mm + ':' + ss;

  req.session.token = {
    'year': y,
    'month': m,
    'monthname': mn,
    'day': dd,
    'time': _time,
    'hour': hh,
  };
}
