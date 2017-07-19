'use strict';
exports.show_summary = function(req, res) {
  user.find({}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.get_detail = function(req, res) {
  var new_user = (req.body);
  new_user.save(function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.get_performance = function(req, res) {
  user.find({email: req.params.module}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};
