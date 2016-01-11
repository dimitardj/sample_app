var Q = require('Q');
var acAlg = require('../../utils/ahoCorasickAlgorithm');
var session = require('../../utils/session');
var log4js = require('log4js');
var jade = require('jade');

function usersController(repository) {

  this.loadIndexPage = function(req, res) {

    res.render('index', { title: 'Express' });
  };

  this.loginUser = function(req, res) {
    repository.getUserData(req.body.user,req.body.pass)
    .then(function(rows) {
      if (rows.length >= 1){

        var index = -1;
        for (var i = 0; i < rows.length; i++) {
          if (rows[i].IP.trim() == req.connection.remoteAddress.trim()) {
            index = i;
          }
        }
        if (index == -1) {
          session.currentUser = rows[0];
          session.currentUser.IP = req.connection.remoteAddress.trim();
          session.currentUser.rating = 0;
          repository.saveUserInfo(session.currentUser);
        } else {
          session.currentUser = rows[index];
        }
        var htmlOutput = {
          user: {
            name: rows[0].username
          }
        };
        res.render('index', htmlOutput);
      } else {
        res.render('index', {});
      }
    });
  };

  this.getUserData = function(req, res) {
    this.repository.getUserData(1)
    .then(function(rows) {
      res.send(rows);
    });
  };

};


module.exports = function (repository){
	return new usersController(repository);
};