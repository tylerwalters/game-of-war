var Card = function (rank, suit, value) {
	this.rank = rank;
	this.suit = suit;
	this.value = value;
}

/** 
	* Controller for the deck of cards.
	* 
	* @namespace Deck
	*/

module.exports = function () {
	'use strict';

	this.cards = [];

	this.build = function () {
		var ranks = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King'],
				suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'],
				values = [14, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
				cards = [];

		suits.forEach(function (suitEle, suitIdx) {
			ranks.forEach(function (rankEle, rankIdx) {
				var card = new Card(rankEle, suitEle, values[rankIdx]);
				cards.push(card);
			})
		})

		this.cards = cards;
	}

	/**
		* Adds a new product to the compare products bank on the product list page.
		* 
		* @param {Array} players An array containing each of the players
		* 
		* @memberof Deck
		*/
	this.deal = function (player1, player2) {
		var hand1 = [],
				hand2 = [];

		this.cards.forEach(function (ele, idx) {
			(idx % 2 !== 0) ? hand1.push(ele) : hand2.push(ele);
		});

		player1.setCards(hand1);
		player2.setCards(hand2);
	};

	/**
		* Shuffles the cards using the Fisher-Yaters shuffle algorithm.
		* 
		* @param {Array} players An array containing each of the players
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