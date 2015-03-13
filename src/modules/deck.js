/** 
	* Properties and methods for a deck of cards.
	* 
	* @namespace Deck
	*/

module.exports = (function () {
	var Deck = {},
			deck = [];

	/**
		* Adds a new product to the compare products bank on the product list page.
		* 
		* @param {Array} players An array containing each of the players
		* 
		* @memberof Deck
		*/
	Deck.deal = function (players) {

	};

	/**
		* Adds a new product to the compare products bank on the product list page.
		* 
		* @param {Array} players An array containing each of the players
		* 
		* @memberof Deck
		*/
	Deck.shuffle = function () {
		deck.sort(function (card1, card2) {
			return ;
		});
	};

	return Deck;
})();