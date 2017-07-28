'use strict';
module.exports = function(app) {
  var tasks = require('../controllers/TasksController');
  var user = require('../controllers/userController');
  var login = require('../controllers/LoginController');
  var course = require('../controllers/CoursesController');
  var grade = require('../controllers/GradesController');
  var perf = require('../controllers/PerformanceController');
  var reports = require('../controllers/ReportsController');
  var attendance = require('../controllers/AttendanceController');

  global.monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
                    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

  global.d = new Date();
  global.y = d.getFullYear();
  global.dd = d.getDate();
  global.hh = d.getHours();
  global.mm = d.getMinutes();
  global.ss = d.getSeconds();
  global.m = d.getMonth();
  global.mn = monthNames[d.getMonth()];
  global._time = hh + ':' + mm + ':' + ss;

  global.menus = {
      'tasks_label': 'My Tasks',
      'courses_label':'My Courses',
      'performance_label': 'My Performance',
      'attendance_label': 'Attendance',
      'submissions_label': 'My Submissions',
      'manage_usr_label': 'Manage User',
      'reports_label':'Reports'
  };

  global.token = {
    'year': y,
    'month': m,
    'monthname': mn,
    'day': dd,
    'time': _time,
    'hour': hh,
  };

  global.arr = {
    'username': '',
    'email': '',
    'status': 'inactive',
    'loggedIn': false,
    'body': '',
    'role': '',
  };
  global.buttons = {
    'add_task': ''
  }

  // Login Routes
  app.route('/')
    .get(login.getCurrentUser)
    .post(login.authenticate);

  // Tasks Routes
  app.route('/tasks')
    .get(tasks.list_all_tasks)
    .post(tasks.add_task)
    .put(tasks.update_task)
    .delete(tasks.delete_task);

  app.route('/tasks/:taskId')
    .get(tasks.get_task);

  // Performance Routes
  app.route('/home')
    .get(perf.show_summary)
    .post(perf.get_detail);
  app.route('/home/:module')
    .get(perf.get_performance);

  // Users Routes
  app.route('/manage_usr')
    .get(user.get_users)
    .post(user.add_new_user);

  app.route('/manage_usr/:email')
    .get(user.authenticate)
    .put(user.update_user_prof)
    .delete(user.delete_user);

  // Courses Routes
  app.route('/courses')
    .get(course.list_all_courses)
    .post(course.create_course);

  app.route('/courses/:course')
    .get(course.get_course)
    .put(course.update_course)
    .delete(course.delete_course);

  // Submissions Routes
  app.route('/grades')
    .get(grade.list_all_grades)
    .post(grade.create_grade);

  app.route('/grade/:grade')
    .get(grade.get_grade)
    .put(grade.update_grade)
    .delete(grade.delete_grade);

  // Attendance Routes
  app.route('/attendance')
    .get(attendance.list_all_attendance)
    .post(attendance.add_attendance);

  app.route('/attendance/:email/:att_id')
    .get(attendance.get_attendance)
    .put(attendance.update_attendance)
    .delete(attendance.delete_attendance);

  // Attendance Report Routes
  app.route('/reports')
    .get(reports.print_attendance);

  // Page Not Routes
  //app.route('/404')
    //.render("404", {'predef': arr});

};
