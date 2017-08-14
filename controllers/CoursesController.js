'use strict';
exports.list_all_courses = function(req, res) {
  if (req.session.email == undefined){
    res.render("login");
  }else{
    var auth_url = mc_api + "course/";
    request(auth_url, function (error, response, body) {
      var courses = JSON.parse(body);
      var arr = req.session;
      res.render("courses", {menus, courses, arr});

      });
  }
};

exports.create_course = function(req, res) {
  if (req.session.email == undefined){
    res.render("login");
  }else{
    if (req.body.route == "post"){
      addnew(req, res);
    }
    if (req.body.route == "delete"){
      delete_course(req, res);
    }
  }
};

function addnew(req, res){

  var url_partial = "course/";
  var auth_url = mc_api + url_partial;

  console.log(req.body.show);

  req.body.isActive = true;
  request.post({headers: {'content-type': 'application/x-www-form-urlencoded'}, url: auth_url, form:req.body }, function(error, response, body){
    var courses = JSON.parse(body);
    var msg = 'Error adding course, Please contact your administrator';

    var failed = true;
    if (error == null){
        failed = false;
        msg = 'successfully added course';
        var arr = req.session;
        res.render('courses', {menus, courses, arr, failed, msg});
    }else {
      failed = true;
      msg = 'error saving course';
      var arr = req.session;
      res.render('courses', {menus, courses, arr, failed, msg});
    }
  });
}

exports.get_course = function(req, res) {
  if (req.session.email == undefined){
    res.render("login");
  }

};

exports.update_course = function(req, res) {
  if (req.session.email == undefined){
    res.render("login");
  }

};

function delete_course(req, res) {

  var url_partial = "course/" + req.body.course;
  var auth_url = mc_api + url_partial;

  console.log(auth_url);
  req.body.isActive = false;
  console.log(req.body);
  request.delete({headers: {'content-type': 'application/x-www-form-urlencoded'}, url: auth_url, form:req.body }, function(error, response, body){
    var courses = JSON.parse(body);
    var msg = 'Error discontinuing course, Please contact your administrator';

    var failed = true;
    if (error == null){
        failed = false;
        msg = 'course successfully discontinued';
        var arr = req.session;
        res.render('courses', {menus, courses, arr, failed, msg});
    }else {
      failed = true;
      msg = 'error discontinuing course';
      var arr = req.session;
      res.render('courses', {menus, courses, arr, failed, msg});
    }
  });
};
