'use strict';
exports.show_summary = function(req, res) {
  //TODO: load current user performance summary
  var arr = req.session;
  res.render("index", {menus, arr});
};

exports.get_detail = function(req, res) {
  //TODO: Load performance details
  var arr = req.session;
  res.render("index", {menus, arr});
};

exports.get_performance = function(req, res) {
  //TODO: Load a specific performance
  var arr = req.session;
  res.render("index", {menus, arr});
};
