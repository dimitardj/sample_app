var Q = require('Q');
var connection = require('./mysql_connection')();
var _ = require('lodash');
var machina = require('machina');
var DFA = require('./DFA');
var session = require('./session');

function SPMA(query) {
	var j = 0;
    var i = query.indexOf('WHERE');
    var currentQuery = query.substring(i + 5);
    var checkResult = ACAlg(currentQuery);
    DFA.reset();

     if (checkResult > -1) {
         session.currentUser.rating = 1;
         currentQuery = currentQuery.substring(checkResult);
     } else {
         currentQuery = currentQuery.substring(1);
     }
	if (session.currentUser.rating > 0) {
		return true;
	} else {
		return false;
	}
}

function ACAlg(query) {
	var i = 0,
		n = query.length,
		returnedResult = -1;

	for (; i < n; i++) {
		while (i < n && !(DFA.transition(query.charAt(i)))) {
			DFA.reset();

            if (!(DFA.transition(query.charAt(i)))) {
                DFA.reset();
            }
			i++;
		}
		if (i < n && DFA.isInFinalState()) {
			returnedResult = i;
            return returnedResult;
		}
	}

	return returnedResult;
}

module.exports = {
	    SPMA: SPMA
};