class LoadState extends Phaser.State {
	constructor() {
		super();
	}

	preload() {
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
	}

	create() {
		console.log("hello world")
		let bg = game.add.image(0, 0, game.atlasName, "title.png");
		bg.inputEnabled = true;
		bg.events.onInputDown.add(() => {
			game.state.start("play");
		});
		game.stage.disableVisibilityChange = true;
		game.add.text(210, 500, "Click to play!", { fontSize: 60, stroke: "#000000", strokeThickness: 10, fill: "#00deff"});
		game.state.add("play", new PlayState());
		game.state.add("end", new EndState());
	}
}