'use strict';
exports.show_summary = function(req, res) {
  //TODO: load current user performance summary
  res.render("index", {menus, token, arr});
};

exports.get_detail = function(req, res) {
  //TODO: Load performance details
  res.render("index", {menus, token, arr});
};

exports.get_performance = function(req, res) {
  //TODO: Load a specific performance
  res.render("index", {menus, token, arr});
};
