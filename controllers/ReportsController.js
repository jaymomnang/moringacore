'use strict';

exports.print_attendance = function(req, res) {
  if (req.session.email == null){
    res.redirect(urlpath);
  }
  var arr = req.session;
  res.render("reports", {menus, arr, monthNames});
};
