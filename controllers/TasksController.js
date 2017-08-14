'use strict';

//load page defaults
exports.list_all_tasks = function(req, res) {

  console.log(req.session.email);
  if (req.session.email == undefined){
    res.render("login");
  }
  else{

    var auth_url = mc_api + "tasks/";
    request(auth_url, function (error, response, body) {

      if (error) return error;
      var data = JSON.parse(body);
      req.session.tasks = data;

      //get courses data
      var _url1 = mc_api + "course/";
      request(_url1, function (error, response, body) {
        var data1 = JSON.parse(body);
        if (error) return error;
        req.session.courses = data1;

        ///get student data
        var _url2 = mc_api + "login/";
        request(_url2, function (error, response, body) {
          var data2 = JSON.parse(body);
          if (error) return error;
          req.session.users = data2;

          var token = req.session.token;
          var arr = req.session;
          res.render("tasks", {menus, token, arr});
        });

      });

    });

  }


};

//post page data
exports.add_task = function(req, res) {

  if (req.session.email == undefined){
    res.render("login");
  }else{
    var url_partial = "tasks/";
    var auth_url = mc_api + url_partial;
    request.post({headers: {'content-type': 'application/x-www-form-urlencoded'}, url: auth_url, form:req.body }, function(error, response, body){
        req.session.tasks = JSON.parse(body);
        var msg = 'Error creating task, Please contact your administrator';
        var failed = true;
        if (!error){
            failed = false;
            msg = 'successfully created task';
            var token = req.session.tasks;
            var arr = req.session;
            res.render('tasks', {menus, token, arr, failed, msg});
        }
    });
  }
};


exports.get_task = function(req, res) {

  if (req.session.email == undefined){
    res.render("login");
  }else{
    var url_partial = "tasks/" + req.params.taskId;
    var auth_url = mc_api + url_partial;

    request(auth_url, function (error, response, body) {
      var data = JSON.parse(body);
      //prepare display data
      //TODO: load the data needed here.
      res.render(url_partial, {arr, menus, data});
    });
  }

};

exports.update_task = function(req, res) {

  if (req.session.email == undefined){
    res.render("login");
  }else{
    var url_partial = "tasks/" + req.params.taskId;
    var auth_url = mc_api + url_partial;
    req.body.isActive = false;
    request.put({headers: {'content-type': 'application/x-www-form-urlencoded'}, url: auth_url, form:req.body }, function (error, response, body) {
      var data = JSON.parse(body);
      //prepare display data
      res.render(url_partial, arr);
    });
  }
};

exports.delete_task = function(req, res) {
  //TODO: write a process for deleting a task
  if (req.session.email == undefined){
    res.render("login");
  }else{

  }

};
