'use strict';
module.exports = function(app) {
  var tasks = require('../controllers/TasksController');
  var user = require('../controllers/userController');
  var login = require('../controllers/LoginController');
  var course = require('../controllers/CoursesController');
  var submission = require('../controllers/SubmissionController');
  var perf = require('../controllers/PerformanceController');
  var reports = require('../controllers/ReportsController');
  var attendance = require('../controllers/AttendanceController');

  global.monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
                    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

  global.menus = {
      'tasks_label': 'My Tasks',
      'courses_label':'My Courses',
      'performance_label': 'My Performance',
      'attendance_label': 'Attendance',
      'submissions_label': 'My Submissions',
      'manage_usr_label': 'Manage User',
      'reports_label':'Reports'
  };

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
    .put(user.update_user_prof)
    .delete(user.delete_user);

  // Courses Routes
  app.route('/courses')
    .get(course.list_all_courses)
    .post(course.create_course);

  app.route('/courses/:course')
    .get(course.get_course);

  // Submissions Routes
  app.route('/submissions')
    .get(submission.list_all_submissions)
    .post(submission.subtmit_task);

  app.route('/submissions/:subId')
    .get(submission.get_submitted_task)
    .put(submission.update_submission)
    .delete(submission.delete_submission);

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
