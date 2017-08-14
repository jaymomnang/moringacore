'use strict';
exports.list_all_submissions = function(req, res) {
  if (req.session.email == undefined){
    res.render("login");
  }else{
    var arr = req.session;
    res.render("submissions", {menus, arr, monthNames});
  }
};

exports.subtmit_task = function(req, res) {
  //TODO: Handle submission process here
  if (req.session.email == undefined){
    res.render("login");
  }
};

exports.get_submitted_task = function(req, res) {
  //TODO: Handle submission process here
  if (req.session.email == undefined){
    res.render("login");
  }
};

exports.update_submission = function(req, res) {
  //TODO: Handle submission process here
  if (req.session.email == undefined){
    res.render("login");
  }
};

exports.delete_submission = function(req, res) {
  //TODO: Handle submission process here
  if (req.session.email == undefined){
    res.render("login");
  }
};
