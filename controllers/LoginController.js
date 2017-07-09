'use strict';

var mongoose = require('mongoose'),
    //schema = mongoose.Schema,
    login = mongoose.model('login');

exports.get_preq = function(req, res) {
  console.log(login);
  login.find({}, function(err, login) {
    console.log(login);
    if (err) return console.log(err);
    console.log(login);
  });
};

//exports.create_an_invoice = function(req, res) {
//  var new_invoice = new invoice(req.body);

//  new_invoice.save(function(err, new_invoice) {
//    if (err){
//      res.send(err);
//      res.json(new_invoice);
//    }
//      console.log(new_invoice);
//  });
//};

exports.authenticate = function(req, res) {
  login.findById(req.params.email, function(err, login) {
    if (err)
      res.send(err);
    res.json(login);
  });
};

exports.updateLogin = function(req, res) {
  login.findOneAndUpdate({userid: req.params.email}, req.body, {new: true}, function(err, login) {
    if (err)
      res.send(err);
    res.json(login);
  });
};

exports.dactivateLogin = function(req, res) {
  login.remove({
    email: req.params.email
  }, function(err, login) {
    if (err)
      res.send(err);
    res.json({ message: 'user deactivated successfully' });
  });
};
