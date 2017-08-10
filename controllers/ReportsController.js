'use strict';

exports.print_attendance = function(req, res) {
  var arr = req.session;
  res.render("reports", {menus, arr, monthNames});
};
