var Q = require('Q');
var acAlg = require('../../utils/ahoCorasickAlgorithm');
var session = require('../../utils/session');
var log4js = require('log4js');
var jade = require('jade');
var Random = require('random-js');

function BanksController(bankRepository, userRepository) {
	this.bankRepository = bankRepository;
	this.userRepository = userRepository;

  this.getBankData = function(req, res) {

      var bankDataQuery = bankRepository.getBankDataQuery(req.body.iban);

      var result = acAlg.SPMA(bankDataQuery);

      if (result == "Blind SQL Injection Anomaly Detected.") {
        session.currentUser.rating = 1;
        console.log('Injection from ', session.currentUser);

        if (!req.body.test) {
          this.userRepository.saveUserInfo(session.currentUser);
        }

        res.send(result);
      } else {
        bankRepository.getBankData(req.body.iban)
        .then(function(rows) {

          res.send(rows);
        });
      }
  };
}

module.exports = function(bankRepository, userRepository) {
  return new BanksController(bankRepository, userRepository);
};