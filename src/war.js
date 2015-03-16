var Player = require('./modules/player'),
		Deck = require('./modules/deck'),
		war = require('./modules/war'),
		playerOne, playerTwo, cards;

playerOne = new Player('Player 1'),
playerTwo = new Player('Player 2');
deck = new Deck();

deck.build();
deck.shuffle();
deck.deal(playerOne, playerTwo);

war.setup(playerOne, playerTwo);
war.title();
war.start();