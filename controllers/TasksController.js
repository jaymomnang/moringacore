'use strict';

//load page defaults
exports.list_all_tasks = function(req, res) {
  if (arr.loggedIn == false){
    res.render("login");
  }

  var auth_url = mc_api + "tasks/";
  request(auth_url, function (error, response, body) {
    var data = JSON.parse(body);
    if (error) return error;
    token.data = data;

    //get courses data
    var _url1 = mc_api + "course/";
    request(_url1, function (error, response, body) {
      var data1 = JSON.parse(body);
      if (error) return error;
      token.courses = data1;

      ///get student data
      var _url2 = mc_api + "login/";
      request(_url2, function (error, response, body) {
        var data2 = JSON.parse(body);
        if (error) return error;
        token.users = data2;
        res.render("tasks", {menus, token, arr});
      });

    });

  });
};

//post page data
exports.add_task = function(req, res) {
  var url_partial = "tasks/";
  var auth_url = mc_api + url_partial;

  var students = req.body.students;
  var i = 0;
  for (i == 0; i < students.length; i++) {

    req.body.email = students[i];
    request.post({headers: {'content-type': 'application/x-www-form-urlencoded'}, url: auth_url, form:req.body }, function(error, response, body){
      var data1 = JSON.parse(body);
      var msg = 'Error creating task, Please contact your administrator';
      var failed = true;
      if (!error){
          failed = false;
          msg = 'successfully created task';
          console.log(error);
          //load tasks
          var auth_url = mc_api + "tasks/";
          request(auth_url, function (error, response, body) {

            if ((i+1) == students.length ){

              var data = JSON.parse(body);
              token.data = data;
              res.render('tasks', {menus, token, arr, failed, msg});
            }

          });
      }

    });
  }

};


exports.get_task = function(req, res) {
  if (arr.loggedIn == false){
    res.redirect("/");
  }
  var url_partial = "tasks/" + req.params.taskId;
  var auth_url = mc_api + url_partial;

  request(auth_url, function (error, response, body) {
    var data = JSON.parse(body);
    //prepare display data
    //TODO: load the data needed here.
    res.render(url_partial, arr);
  });

};

exports.update_task = function(req, res) {
  var url_partial = "tasks/" + req.params.taskId;
  var auth_url = mc_api + url_partial;
  req.body.isActive = false;
  request.put({headers: {'content-type': 'application/x-www-form-urlencoded'}, url: auth_url, form:req.body }, function (error, response, body) {
    var data = JSON.parse(body);
    //prepare display data
    res.render(url_partial, arr);
  });
};

exports.delete_task = function(req, res) {
  //TODO: write a process for deleting a task
};
