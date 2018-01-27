"use strict";

(function($) {
	console.log("hello world!")
	//experimental use of Satori for multiplayer if needed
	var rtm = $.RTMLayer;

	var game = $.game = new Phaser.Game(800, 600, Phaser.AUTO, '', { 
		preload: function() {
			//Asset loading here
			game.atlasName = "gameAtlas";
			game.load.atlas(game.atlasName, "./assets/textures.png",  "./assets/textures.json");
		},
		create: function() {
			//Initialize stuff here
			game.bg = game.add.existing(new GameMap(0,0));
			let goober = game.add.existing(new GreenGoober(game.canvas.width - 100, 0));
			game.elder = game.add.existing(new Elder(game.canvas.width/2, game.canvas.height - 75));
		},
		update: function() {
			//funny stuff with the game update loop here if you wanna
		} 
	});
}(this))