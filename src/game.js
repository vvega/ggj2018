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
			game.add.sprite(400, 300, game.atlasName, "alric.png");
		},
		update: function() {
			//funny stuff with the game update loop here if you wanna
		} 
	});


}(this))