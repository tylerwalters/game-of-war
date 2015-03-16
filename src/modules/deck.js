/** 
	* Creates a new Card.
	* 
	* @class Card
	*/
var Card = function (rank, suit, value) {
	this.rank = rank;
	this.suit = suit;
	this.value = value;
};

/** 
	* Creates a new Deck of Cards.
	* 
	* @class Deck
	*/

module.exports = function () {
	'use strict';

	this.cards = [];

	/**
		* Builds a standard deck of 52 cards.
		* 
		* @memberof Deck
		*/
	this.build = function () {
		var ranks = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King'],
				suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'],
				values = [14, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
				cards = [];

		suits.forEach(function (suitEle, suitIdx) {
			ranks.forEach(function (rankEle, rankIdx) {
				var card = new Card(rankEle, suitEle, values[rankIdx]);
				cards.push(card);
			});
		});

		this.cards = cards;
	};

	/**
		* Deals out the cards between two players. Alternates between players to
		* simulate a real deal.
		* 
		* @param {Object} player1 The first Player object
		* @param {Object} player2 The second Player object
		* 
		* @memberof Deck
		*/
	this.deal = function (player1, player2) {
		var hand1 = [],
				hand2 = [];

		this.cards.forEach(function (ele, idx) {
			if (idx % 2 !== 0) {
				hand1.push(ele);
			}
			else {
				hand2.push(ele);
			}
		});

		player1.cards = hand1;
		player2.cards = hand2;
	};

	/**
		* Shuffles the deck of cards using the Fisher-Yaters shuffle algorithm.
		* 
		* @memberof Deck
		*/
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