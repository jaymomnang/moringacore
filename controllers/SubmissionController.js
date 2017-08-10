'use strict';
exports.list_all_submissions = function(req, res) {
  if (req.session.email == null){
    res.redirect(urlpath);
  }
  var arr = req.session;
  res.render("submissions", {menus, arr, monthNames});
};

exports.subtmit_task = function(req, res) {
  //TODO: Handle submission process here
  if (req.session.email == null){
    res.redirect(urlpath);
  }
};

exports.get_submitted_task = function(req, res) {
  //TODO: Handle submission process here
  if (req.session.email == null){
    res.redirect(urlpath);
  }
};

exports.update_submission = function(req, res) {
  //TODO: Handle submission process here
  if (req.session.email == null){
    res.redirect(urlpath);
  }
};

exports.delete_submission = function(req, res) {
  //TODO: Handle submission process here
  if (req.session.email == null){
    res.redirect(urlpath);
  }
};
