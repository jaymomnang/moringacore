'use strict';
module.exports = function(app) {
  var mc = require('../controllers/LoginController');

  // todoList Routes
  app.route('/')
    .get(invoice.get_preq)
    .post(invoice.authenticate);

  app.route('/:UsrId')
    .get(invoice.authenticate)
    .put(invoice.updateLogin)
    .delete(invoice.dactivateLogin);
};
