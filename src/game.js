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
			game.clock = new Clock();
			game.clock.signal.add(function(b, m) { this.measure = m; this.beat = b; }, game.clock);

			game.map = game.add.existing(new GameMap(0,0));
			game.testGoober = game.add.existing(new GreenGoober(130, 220));
			game.elder = game.add.existing(new Elder(game.canvas.width/2, game.canvas.height - 75));
		},
		update: function() {
			//funny stuff with the game update loop here if you wanna
		},
		render() {
			game.debug.text(game.clock.measure + ":" + game.clock.beat, 32, 96, "fuchsia");
			game.debug.geom(game.elder.lineOfSight, game.elder.lineOfSight.obstructed ? 'rgba(255,0,0,1)' : 'rgba(0,255,0,1)');
			/*game.map.detailObjects && game.map.detailObjects.forEach(function(el) {
				game.debug.geom(el.boundingLine, 'rgba(255,255,0,1)');
			});*/
		}

	});
}(this))