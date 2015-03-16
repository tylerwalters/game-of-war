var prompt = require('prompt');

/** 
	* Player class with properties and methods for each player.
	* 
	* @namespace Player
	*/

module.exports = function (name) {
	'use strict';

	var turn = 0;

	this.name = name;
	this.cards = [];

	this.setCards = function (dealtCards) {
		this.cards = dealtCards;
	}

	/**
		* Adds new cards to player's hand after winning a turn.
		* 
		* @param {Array} collectedCards An array of cards to be added to players hand
		* 
		* @memberof Player
		*/
	this.playCard = function () {
		var card;

		if (++turn % 26 === 0) this.shuffle();
		
		card = this.cards[0];
		this.cards.splice(this.cards.indexOf(card), 1);

		return card;
	};

	/**
		* Adds new cards to player's hand after winning a turn.
		* 
		* @param {Array} collectedCards An array of cards to be added to players hand
		* 
		* @memberof Player
		*/
	this.addCards = function (card) {
		this.cards.push(card);
	};

	this.war = function () {
		var stack = [];

		if (this.cards.length >= 2) {
			stack.push(this.cards[0], this.cards[1]);
			this.cards.splice(this.cards[1], 1);
			this.cards.splice(this.cards[0], 1);
		}
		else if (this.cards.length === 1) {
			stack.push(this.cards[0]);
			this.cards.splice(this.cards[0], 1);
		}

		return stack;
	}

	this.shuffle = function () {
		var current = this.cards.length,
				temp, random;

		while (current) {
			random = Math.floor(Math.random() * current--);
			temp = this.cards[current];
			this.cards[current] = this.cards[random];
			this.cards[random] = temp;
		}
	};
};