"use strict";

let debugMode = 1;

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
			let goober = game.add.existing(new GreenGoober());
			let elder = game.add.existing(new Elder());
			let clock = new Clock();
			clock.signal.add((m, b)=>{game.debug.text(m + ":" + b, 32, 96, "fuchsia");});
		},
		update: function() {
			//funny stuff with the game update loop here if you wanna
		} 
	});
}(this))