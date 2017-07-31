'use strict';
exports.show_summary = function(req, res) {
  res.render("reports", {menus, token, arr, buttons, monthNames});
};

exports.get_detail = function(req, res) {
  //TODO: process and load performance details.
};

exports.get_performance = function(req, res) {
  //TODO: process and load performance details.
};
