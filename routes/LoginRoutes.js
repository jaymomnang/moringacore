'use strict';
module.exports = function(app) {
  var mc = require('../controllers/mcController');

  // todoList Routes
  app.route('/')
    .get(invoice.get_preq)
    .post(invoice.authenticate);

  app.route('/:UsrId')
    .get(invoice.get_an_invoice)
    .put(invoice.update_an_invoice)
    .delete(invoice.delete_an_invoice);
};
