/** 
	* Creates a new Player.
	* 
	* @class Player
	*/
module.exports = function (name) {
	'use strict';

	var turn = 0;

	this.name = name;
	this.cards = [];

	/**
		* Adds new cards to player's hand after winning a turn.
		* 
		* @param {Array} collectedCards An array of cards to be added to players hand
		* 
		* @memberof Player
		*/
	this.addCards = function (cards) {
		// Shuffles the cards before adding them to the hand to simulate picking up
		// a disorganized pile of cards.
		this.shuffle(cards);
		this.cards = this.cards.concat(cards);
	};

	/**
		* Plays the next card in the player's hand.
		* 
		* @memberof Player
		*/
	this.playCard = function () {
		var card;
		
		card = this.cards[0];
		this.cards.splice(this.cards.indexOf(card), 1);

		return card;
	};

	/**
		* Shuffles the cards using the Fisher-Yaters shuffle algorithm.
		* 
		* @param {Array} players An array containing each of the cards
		* 
		* @memberof Player
		*/
	this.shuffle = function (cards) {
		var current = cards.length,
				temp, random;

		while (current) {
			random = Math.floor(Math.random() * current--);
			temp = cards[current];
			cards[current] = cards[random];
			cards[random] = temp;
		}
	};

	/**
		* In the event of a War, checks how many cards are available in the player's
		* hand. If enough cards are available it plays one card face down and one
		* face up. If only one card is available that card is played face up. 
		* Returns nothing if the player's hand is empty and the last played card is
		* used.
		* 
		* @memberof Player
		*/
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
	};
};