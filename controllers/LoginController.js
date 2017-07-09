'use strict';

var mongoose = require('mongoose'),
    //schema = mongoose.Schema,
    invoice = mongoose.model('invoices');

exports.get_preq = function(req, res) {
  console.log(invoice);
  invoice.find({}, function(err, invoices) {
    console.log(invoices);
    if (err) return console.log(err);
    console.log(invoices);
  });
};

exports.create_an_invoice = function(req, res) {
  var new_invoice = new invoice(req.body);

  new_invoice.save(function(err, new_invoice) {
    if (err){
      res.send(err);
      res.json(new_invoice);
    }
      console.log(new_invoice);
  });
};

exports.get_an_invoice = function(req, res) {
  invoice.findById(req.params.invoiceId, function(err, invoice) {
    if (err)
      res.send(err);
    res.json(invoice);
  });
};

exports.update_an_invoice = function(req, res) {
  invoice.findOneAndUpdate({invoice_id: req.params.invoiceId}, req.body, {new: true}, function(err, invoice) {
    if (err)
      res.send(err);
    res.json(invoice);
  });
};

exports.delete_an_invoice = function(req, res) {
  invoice.remove({
    invoice_id: req.params.invoiceId
  }, function(err, invoice) {
    if (err)
      res.send(err);
    res.json({ message: 'Invoice successfully deleted' });
  });
};
