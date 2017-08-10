'use strict';
exports.list_all_submissions = function(req, res) {
  var arr = req.session;
  res.render("submissions", {menus, arr, monthNames});
};

exports.subtmit_task = function(req, res) {
  //TODO: Handle submission process here
};

exports.get_submitted_task = function(req, res) {
  //TODO: Handle submission process here
};

exports.update_submission = function(req, res) {
  //TODO: Handle submission process here
};

exports.delete_submission = function(req, res) {
  //TODO: Handle submission process here
};
