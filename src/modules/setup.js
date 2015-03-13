var prompt = require('prompt');

/** 
	* Properties and methods for a deck of cards.
	* 
	* @namespace Setup
	*/

module.exports = function (playerOne, playerTwo) {
	var schema = {};

	schema.properties = {
		firstPlayer: {
			description: 'Player 1, please enter your name: ',
			required: true,
			default: 'Player 1'
		},
		secondPlayer: {
			description: 'Player 2, please enter your name: ',
			required: true,
			default: 'Player 2'
		}
	};

	prompt.get(schema, function(err, result) {
		playerOne.name = result.firstPlayer;
		playerTwo.name = result.secondPlayer;
	});
};