var Player = require('./modules/player'),
		deck = require('./modules/deck'),
		setup = require('./modules/setup');

var playerOne = new Player(),
		playerTwo = new Player();

setup(playerOne, playerTwo);
