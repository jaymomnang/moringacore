'use strict';
exports.list_all_courses = function(req, res) {
  if (arr.loggedIn == false){
    res.render("login");
  }

  var auth_url = mc_api + "course/";
  request(auth_url, function (error, response, body) {
    var data = JSON.parse(body);
    token.data = data;
    res.render("courses", {menus, token, arr});

    });
};

exports.create_course = function(req, res) {
  var url_partial = "course/";
  var auth_url = mc_api + url_partial;

  req.body.isActive = true;
  request.post({headers: {'content-type': 'application/x-www-form-urlencoded'}, url: auth_url, form:req.body }, function(error, response, body){
    var data = JSON.parse(body);
    var msg = 'Error adding course, Please contact your administrator';

    var failed = true;
    if (error == null){
        failed = false;
        msg = 'successfully added course';
        token.data = data;
        res.render('courses', {menus, token, arr, failed, msg});
    }else {
      failed = true;
      msg = 'error saving course';
      token.data = data;
      res.render('courses', {menus, token, arr, failed, msg});
    }
  });
};

exports.get_course = function(req, res) {
  Course.findById(req.params.course, function(err, course) {
    if (err)
      res.send(err);
      res.json(course);
  });
};

exports.update_course = function(req, res) {
  Course.findOneAndUpdate({course: req.params.course}, req.body, {new: true}, function(err, course) {
    if (err)
      res.send(err);
      res.json(course);
  });
};

exports.delete_course = function(req, res) {

  var url_partial = "course/" + req.body.course;
  var auth_url = mc_api + url_partial;

  console.log(auth_url);

  req.body.isActive = false;
  request.delete({headers: {'content-type': 'application/x-www-form-urlencoded'}, url: auth_url, form:req.body }, function(error, response, body){
    var data = JSON.parse(body);
    var msg = 'Error discontinuing course, Please contact your administrator';

    var failed = true;
    if (error == null){
        failed = false;
        msg = 'course successfully discontinued';
        token.data = data;
        res.render('courses', {menus, token, arr, failed, msg});
    }else {
      failed = true;
      msg = 'error discontinuing course';
      token.data = data;
      res.render('courses', {menus, token, arr, failed, msg});
    }
  });
};
