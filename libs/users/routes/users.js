var express = require('express');
var router = express.Router();

module.exports = function(controller){

  /* POST users data. */
  router.get('/', controller.loadIndexPage);
  router.get('/getUserData', controller.getUserData);

  router.post('/', controller.loginUser);

  return router;

};
