'use strict';
var crypt = require('crypto');
const secret = '#M0r1ng4C0r3';

var getHash = function(pwd){
  const hash = crypt.createHmac('sha256', secret)
                     .update(pwd)
                     .digest('hex');
  return hash;
}


exports.get_users = function(req, res) {
  ///get users data
  var _url2 = mc_api + "login/";
  request(_url2, function (error, response, body) {
    var data2 = JSON.parse(body);
    if (error) return error;
    token.data = data2;
    res.render("users", {menus, token, arr});
  });
};

exports.add_new_user = function(req, res) {
  var new_user = new user(req.body);
  var pwd = getHash(new_user.pwd);
  new_user.pwd = pwd;
  new_user.save(function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.authenticate = function(req, res) {
  var password = getHash(req.params.pwd);
  user.find({email: req.params.email, pwd: password}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.update_user_prof = function(req, res) {
  user.findOneAndUpdate({email: req.params.email}, req.body, {new: true}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.delete_user = function(req, res) {
  user.findOneAndUpdate({email: req.params.email}, req.body, {new: true}, function(err, user) {
    if (err)
      res.send(err);
      res.json({message: 'User deactivated successfully'});
  });
};
