'use strict';
//var crypt = require('crypto');
//const secret = '#M0r1ng4C0r3';

//var getHash = function(pwd){
//  const hash = crypt.createHmac('sha256', secret)
//                     .update(pwd)
//                     .digest('hex');
//  return hash;
//}


exports.get_users = function(req, res) {
  //get users data
  var _url2 = mc_api + "login/";
  request(_url2, function (error, response, body) {
    var data2 = JSON.parse(body);
    if (error) return error;
    token.data = data2;
    res.render("users", {menus, token, arr});
  });
};

exports.add_new_user = function(req, res) {

  var new_user = req.body;
  if (new_user.pwd != new_user.pwd2){

    console.log(new_user.pwd2);
    var msg = "The password do not match. Please enter the password again";
    var failed = true;
    res.render("users", {menus, token, arr, failed, msg});

  }else{

    var _url2 = mc_api + "login/";
    new_user.isActive = true;
    new_user.status = "active";

    request.post({headers: {'content-type': 'application/x-www-form-urlencoded'}, url: _url2, form:new_user }, function(error, response, body){
      var failed = true;
      if (error == null){
          failed = false;
          msg = 'successfully added user account';

          request(_url2, function (error, response, body) {
            var data = JSON.parse(body);
            if (error) return error;
            token.data = data;
            res.render('users', {menus, token, arr, failed, msg});
          });
      }else{
        failed = true;
        msg = 'error creating user account';
        res.render('users', {menus, token, arr, failed, msg});
      }
    });

  }

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
