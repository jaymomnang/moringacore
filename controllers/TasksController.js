'use strict';
exports.list_all_tasks = function(req, res) {


  if (arr.loggedIn == false){
    res.redirect("/");
  }

  var auth_url = mc_api + "tasks/";
  request(auth_url, function (error, response, body) {
    var data = JSON.parse(body);
    token.data = data;
    console.log(arr);
    if (arr.role != 'Admin'){
      buttons.add_task = 'display: none;';
    }
    res.render("tasks", {menus, token, arr, buttons});
    });
};

exports.load_task = function(req, res) {
  var new_task = new Task(req.body);
  var url_partial = "tasks/" + new_task.taskid;
  var auth_url = mc_api + url_partial;

  request(auth_url, function (error, response, body) {
    var data = JSON.parse(body);
    //prepare display data
      res.redirect(url_partial);
    });

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
    var arr = {
        //'username': info[0].firstname + " " + info[0].lastname,
        //'email': info[0].email,
        //'status': info[0].status,
        'year': y,
        'month': m,
        'day': dd,
        //'loggedIn': true,
        'data': data,
        'tasks_label': 'My Tasks',
        'courses_label':'My Courses',
        'performance_label': 'My Performance',
        'attendance_label': 'Attendance',
        'submissions_label': 'My Submissions',
        'manage_usr_label': 'Manage User',
        'reports_label':'Reports'
      };
      res.render(url_partial, arr);
    });

};

exports.update_task = function(req, res) {

  var url_partial = "tasks/" + req.params.taskId;
  var auth_url = mc_api + url_partial;

  request(auth_url, function (error, response, body) {

    var data = JSON.parse(body);
    //prepare display data
    var arr = {
        'year': y,
        'month': m,
        'day': dd,
        'data': data,
        'tasks_label': 'My Tasks',
        'courses_label':'My Courses',
        'performance_label': 'My Performance',
        'attendance_label': 'Attendance',
        'submissions_label': 'My Submissions',
        'manage_usr_label': 'Manage User',
        'reports_label':'Reports'
      };
      res.render(url_partial, arr);
    });
  Task.findOneAndUpdate({taskid: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
      res.json(task);
  });
};

exports.delete_task = function(req, res) {
  Task.findOneAndUpdate({taskid: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
      res.json({ message: 'Task successfully deactivated' });
  });
};
