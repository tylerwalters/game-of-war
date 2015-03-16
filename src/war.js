var Player = require('./modules/player'),
		Deck = require('./modules/deck'),
		fs = require('fs');

/** 
	* Properties and methods for the game of War.
	* 
	* @namespace War
	*/

var War = (function () {
	'use strict';

	var War = {},
			_gameID = _generateID(5),
			_turn = 0,
			_stream,
			_playerOne, 
			_playerTwo,
			_deck;

	/**
		* Creates players and a deck of cards. Shuffles deck and deals out cards to
		* the players. Logs title page.
		* 
		* @memberof War
		*/
	War.setup = function () {
		// fs.writeFile('output/war_' + _gameID);
		_stream = fs.createWriteStream('output/war_' + _gameID + '.txt');

		_playerOne = new Player('Player 1');
		_playerTwo = new Player('Player 2');
		_deck = new Deck();

		_deck.build();
		_deck.shuffle();
		_deck.deal(_playerOne, _playerTwo);

		_title();
	};

	/**
		* Calls the _taketurn() method as long as both players have cards. Declares
		* a winner when one player runs out of cards.
		* 
		* @memberof War
		*/
	War.start = function () {
		var activeGame = true,
				winner = '';

		while (activeGame = _cardCheck()) {
			_takeTurn();
			_log(_playerOne.name + ' has ' + _playerOne.cards.length + ' cards.');
			_log(_playerTwo.name + ' has ' + _playerTwo.cards.length + ' cards.\n');
		}

		winner = (_playerOne.cards.length === 0) ? _playerTwo.name : _playerOne.name;
		_log(winner + ' is the winner in ' + _turn + ' turns!');

		_stream.end();
	};

	/**
		* Adds cards to the pot.
		* 
		* @param {Array} pot The existing pot.
		* @param {Array} add The card or cards to add to the pot.
		* 
		* @memberof War
		*/
	function _addToPot (pot, add) {
		pot = pot.concat(add);
		return pot;
	}

	function _cardCheck () {
		if (_playerOne.cards.length !== 0 && _playerTwo.cards.length !== 0) {
			return true;
		}
		else {
			return false;
		}
	}

	/**
		* Generates a random ID for the game to be used when creating the log file.
		* 
		* @param {Number} length The desired length of the random string.
		* 
		* @memberof War
		*/
	function _generateID (length) {
		var ID = '',
				characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
				random,
				i;

		for (i = 0; i < length; i++) {
			random = Math.floor(Math.random() * characters.length);
			ID += characters.charAt(random);
		}

		return ID;
	}

	/**
		* Writes to the log file in the output directory.
		* 
		* @param {String} text The message to write to the log file.
		* 
		* @memberof War
		*/
	function _log (text) {
		_stream.write(text + '\n');
	}

	/**
		* Writes to the log file in the output directory.
		* 
		* @param {Array} pot The pot of cards up for grabs.
		* @param {Object} playerOneCard The card played by Player 1.
		* @param {Object} playerTwoCard The card played by Player 2.
		* 
		* @memberof War
		*/
	function _settle (pot, playerOneCard, playerTwoCard) {
		if (playerOneCard.value > playerTwoCard.value) {
			_log(_playerOne.name + ' takes the ' + pot.length + ' cards in the pot on turn ' + _turn + '!\n');
			_playerOne.addCards(pot);
		}
		else if (playerOneCard.value < playerTwoCard.value) {
			_log(_playerTwo.name + ' takes the ' + pot.length + ' cards in the pot on turn ' + _turn + '!\n');
			_playerTwo.addCards(pot);
		}
		else {
			_log('WAR!');
			_war(pot, playerOneCard, playerTwoCard);
		}
	}

	/**
		* Increments the _turn property to track the turn number. Palys a card for
		* each player and adds them to the pot. Logs the cards played by each player.
		* Calls the _settle() method and passes the pot and cards played.
		* 
		* @memberof War
		*/
	function _takeTurn () {
		var pot = [],
				playerOneCard, 
				playerTwoCard, 
				winner;

		_turn++;

		playerOneCard = _playerOne.playCard();
		playerTwoCard = _playerTwo.playCard();

		pot = _addToPot(pot, playerOneCard);
		pot = _addToPot(pot, playerTwoCard);

		_log(_playerOne.name + ' played the ' + playerOneCard.rank + ' of ' + playerOneCard.suit + '.');
		_log(_playerTwo.name + ' played the ' + playerTwoCard.rank + ' of ' + playerTwoCard.suit + '.');

		_settle(pot, playerOneCard, playerTwoCard);
	}

	/**
		* Logs ASCII art, game title, and game ID.
		* 
		* @memberof War
		*/
	function _title () {
		var title = '';

		title = '' +
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
		'                   The Game of War                    \n' +
		'                     Game: ' + _gameID + '                  \n';

		_log(title);
	}

	/**
		* Calls the war() method for each player to add cards to the pot if
		* enough cards are available. Logs whether each player adds a face down
		* card and the face up card or existing card player is playing. Calls
		* _settle() method and passes the pot and cards played.
		* 
		* @param {Array} pot The pot of cards up for grabs.
		* @param {Object} playerOneCard The card played by Player 1.
		* @param {Object} playerTwoCard The card played by Player 2.
		* 
		* @memberof War
		*/
	function _war (pot, playerOneCard, playerTwoCard) {
		var playerOneStack = _playerOne.war(),
				playerTwoStack = _playerTwo.war(),
				oneStackLen = playerOneStack.length,
				twoStackLen = playerTwoStack.length;

		if (oneStackLen > 1) _log(_playerOne.name + ' adds a card face down.');
		if (twoStackLen > 1) _log(_playerTwo.name + ' adds a card face down.');

		pot = _addToPot(pot, playerOneStack);
		pot = _addToPot(pot, playerTwoStack);

		playerOneCard = (oneStackLen !== 0) ? playerOneStack[oneStackLen - 1] : playerOneCard;
		playerTwoCard = (twoStackLen !== 0) ? playerTwoStack[twoStackLen - 1] : playerTwoCard;

		_log(_playerOne.name + ' played the ' + playerOneCard.rank + ' of ' + playerOneCard.suit + '.');
		_log(_playerTwo.name + ' played the ' + playerTwoCard.rank + ' of ' + playerTwoCard.suit + '.');

		_settle(pot, playerOneCard, playerTwoCard);
	}

	return War;
})();

War.setup();
War.start();