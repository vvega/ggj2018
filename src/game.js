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
			game.load.audio('BigBeat1', ['./assets/sounds/music/BigBeat1.ogg']);
			game.load.audio('BigBeat2', ['./assets/sounds/music/BigBeat2.ogg']);
			game.load.audio('BigBeat3', ['./assets/sounds/music/BigBeat3.ogg']);
			game.load.audio('BigBeat4', ['./assets/sounds/music/BigBeat4.ogg']);
			game.load.audio('Chord_C_Ab', ['./assets/sounds/music/Chord_C_Ab.ogg']);
			game.load.audio('Chord_F_G', ['./assets/sounds/music/Chord_F_G.ogg']);
			game.load.audio('Chord_G_Eb', ['./assets/sounds/music/Chord_G_Eb.ogg']);
			game.load.audio('MinorBeat1', ['./assets/sounds/music/MinorBeat1.ogg']);
			game.load.audio('MinorBeat2', ['./assets/sounds/music/MinorBeat2.ogg']);
			game.load.audio('MinorBeat3', ['./assets/sounds/music/MinorBeat3.ogg']);
			game.load.audio('MinorBeat4', ['./assets/sounds/music/MinorBeat4.ogg']);
			game.load.audio('MinorBeat5', ['./assets/sounds/music/MinorBeat5.ogg']);
			game.load.audio('MinorBeat6', ['./assets/sounds/music/MinorBeat6.ogg']);
			game.load.audio('SyncoBeat1', ['./assets/sounds/music/SyncoBeat1.ogg']);
			game.load.audio('SyncoBeat2', ['./assets/sounds/music/SyncoBeat2.ogg']);
			game.load.audio('SyncoBeat3', ['./assets/sounds/music/SyncoBeat3.ogg']);
			game.load.audio('SyncoBeat4', ['./assets/sounds/music/SyncoBeat4.ogg']);
			game.load.audio('WolfChord', ['./assets/sounds/music/WolfChord.ogg']);
			game.load.audio('g1', ['./assets/sounds/speech/glyphshort1.ogg']);
			game.load.audio('g2', ['./assets/sounds/speech/glyphshort2.ogg']);
			game.load.audio('g3', ['./assets/sounds/speech/glyphshort3.ogg']);
			game.load.audio('g4', ['./assets/sounds/speech/glyphshort4.ogg']);
			game.load.audio('g5', ['./assets/sounds/speech/glyphshort5.ogg']);
			game.load.audio('e1', ['./assets/sounds/speech/eldersolo1.ogg']);
			game.load.audio('e2', ['./assets/sounds/speech/eldersolo2.ogg']);
			game.load.audio('e3', ['./assets/sounds/speech/eldersolo3.ogg']);
			game.load.audio('e4', ['./assets/sounds/speech/eldersolo4.ogg']);
		},
		create: function() {
			//Initialize stuff here
			game.state.add("end", new EndState());
			game.clock = new Clock();
			game.clock.signal.add(function(b, m) { this.measure = m; this.beat = b; }, game.clock);

			game.musicManager = new MusicManager();
			game.glyphMessageGen = new GlyphMessageGenerator();

			game.rsignal = new Phaser.Signal();

			game.map = game.add.existing(new GameMap(0,0));
			[game.panelMessages, game.gooberMessages] =[[],[]]// game.glyphMessageGen.generateInitialGlyphMessages();
			game.elder = game.add.existing(new Elder(game.canvas.width/2, game.canvas.height - 155));
			game.testGoober = game.add.existing(new GreenGoober(130, 220));
			game.testWolf = game.add.existing(new Wolf(100, 100, game.testGoober));
			
			game.map.addMapObstructions(2, 3, 1);

			game.ui = game.add.existing(new GameUI(0, 0));

			game.testGoober.alert();

			game.time.events.loop(Phaser.Timer.SECOND/3, () => {
				game.world.sort("y", Phaser.Group.SORT_ASCENDING);
			}, this);

			game.endGame = () => {
				$.elderPosition = game.elder.position;
				this.state.start("end");
			};

		},
		update: function() {
			//funny stuff with the game update loop here if you wanna
		},
		render() {
			game.debug.text(game.clock.measure + ":" + game.clock.beat, 32, 96, "fuchsia");
			game.testGoober.alive && game.debug.geom(game.testGoober.lineOfSight, game.testGoober.lineOfSight.obstructed ? 'rgba(255,0,0,1)' : 'rgba(0,255,0,1)');
			/*game.map.detailObjects && game.map.detailObjects.forEach(function(el) {
				game.debug.geom(el.boundingLine, 'rgba(255,255,0,1)');
			});*/
		}

	});
}(this))