module.exports = function (name, cards) {
	this.name = name;
	this.cards = cards;
	this.index = 0;

	this.playCard = function () {

	};

	this.addCard = function (card) {
		cards.push(card);
	};

	this.removeCard = function (card) {
		cards.splice(cards.indexOf(card), 1);
	};

	this.shuffleCards = function () {

	};
};