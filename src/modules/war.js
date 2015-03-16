/** 
	* Properties and methods for the game of War.
	* 
	* @namespace War
	*/

module.exports = (function () {
	'use strict';

	var War = {},
			_log = '',
			_turn = 0,
			_playerOne, _playerTwo;

	War.setup = function (playerOne, playerTwo) {
		_playerOne = playerOne;
		_playerTwo = playerTwo;
	}

	War.title = function () {
		var titleScreen = '';

		titleScreen = '\n' +
		' -----------------                  ----------------- \n' +
		'| A               |                | 7               |\n' +
		'|                 |                |                 |\n' +
		'|                 |                |     /\\   /\\     |\n' +
		'|                 |                |     \\/   \\/     |\n' +
		'|       / \\       |                |  /\\   /\\    /\\  |\n' +
		'|      (_ _)      |       VS       |  \\/   \\/    \\/  |\n' +
		'|       /_\\       |                |     /\\   /\\     |\n' +
		'|                 |                |     \\/   \\/     |\n' +
		'|                 |                |                 |\n' +
		'|               A |                |               7 |\n' +
		' -----------------                  ----------------- \n' +
		'\n' +
		'                   The Game of War                    \n'

		console.log(titleScreen);
	}

	War.start = function () {
		var activeGame = true;

		while (activeGame = _cardCheck()){
			_takeTurn();
			console.log(_playerOne.name + ' has ' + _playerOne.cards.length + ' cards.');
			console.log(_playerTwo.name + ' has ' + _playerTwo.cards.length + ' cards.\n');
		}

		console.log('That\'s the game! It lasted ' + _turn + ' turns.');
	}

	function _cardCheck () {
		if (_playerOne.cards.length !== 0 && _playerTwo.cards.length !== 0) {
			return true;
		}
		else {
			return false;
		}
	}

	function _takeTurn () {
		var pot = [],
				playerOneCard, 
				playerTwoCard, 
				winner;

		_turn++;

		playerOneCard = _playerOne.playCard();
		playerTwoCard = _playerTwo.playCard();

		_addToPot(pot, playerOneCard);
		_addToPot(pot, playerTwoCard);

		console.log(_playerOne.name + ' played the ' + playerOneCard.rank + ' of ' + playerOneCard.suit + '.');
		console.log(_playerTwo.name + ' played the ' + playerTwoCard.rank + ' of ' + playerTwoCard.suit + '.');

		_settle(pot, playerOneCard, playerTwoCard)
	}

	function _war (pot, playerOneCard, playerTwoCard) {
		var playerOneStack = _playerOne.war(),
				playerTwoStack = _playerTwo.war(),
				oneStackLen = playerOneStack.length,
				twoStackLen = playerTwoStack.length;

		if (oneStackLen > 1) console.log(_playerOne.name + ' adds a card face down.')
		if (twoStackLen > 1) console.log(_playerTwo.name + ' adds a card face down.')

		_addToPot(pot, playerOneStack);
		_addToPot(pot, playerTwoStack);

		playerOneCard = (oneStackLen !== 0) ? playerOneStack[oneStackLen - 1] : playerOneCard;
		playerTwoCard = (twoStackLen !== 0) ? playerTwoStack[twoStackLen - 1] : playerTwoCard;

		console.log(_playerOne.name + ' played the ' + playerOneCard.rank + ' of ' + playerOneCard.suit + '.');
		console.log(_playerTwo.name + ' played the ' + playerTwoCard.rank + ' of ' + playerTwoCard.suit + '.');

		_settle(pot, playerOneCard, playerTwoCard);
	}

	function _addToPot (pot, add) {
		if (add.constructor === Array) {
			add.forEach(function (elem) {
				pot.push(elem);
			});
		}
		else {
			pot.push(add);
		}
	}

	function _settle (pot, playerOneCard, playerTwoCard) {
		if (playerOneCard.value > playerTwoCard.value) {
			console.log(_playerOne.name + ' takes the ' + pot.length + ' cards in the pot!\n');
			pot.forEach(function (card) {
				_playerOne.addCards(card);
			});
		}
		else if (playerOneCard.value < playerTwoCard.value) {
			console.log(_playerTwo.name + ' takes the ' + pot.length + ' cards in the pot!\n');
			pot.forEach(function (card) {
				_playerTwo.addCards(card);
			});
		}
		else {
			console.log('WAR!');
			_war(pot, playerOneCard, playerTwoCard);
		}
	}

	return War;
})();