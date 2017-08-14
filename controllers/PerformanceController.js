'use strict';
exports.show_summary = function(req, res) {
  //TODO: load current user performance summary
  if (req.session.email == undefined){
    res.render("login");
  }else{
    var arr = req.session;
    res.render("index", {menus, arr});
  }
};

exports.get_detail = function(req, res) {
  //TODO: Load performance details
  if (req.session.email == undefined){
    res.render("login");
  }else{
    var arr = req.session;
    res.render("index", {menus, arr});
  }
};

exports.get_performance = function(req, res) {
  //TODO: Load a specific performance
  if (req.session.email == undefined){
    res.render("login");
  }else{
    var arr = req.session;
    res.render("index", {menus, arr});
  }
};
