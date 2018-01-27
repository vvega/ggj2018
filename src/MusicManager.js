class MusicManager {
	constructor () {
		this.AddAssets();
		game.clock.signal.add(this.HandleBeats, this);
	}

	AddAssets() {
		this.bigBeats = [];
		this.bigBeats[0] = game.add.audio('BigBeat1');
		this.bigBeats[1] = game.add.audio('BigBeat2');
		this.bigBeats[2] = game.add.audio('BigBeat3');
		this.bigBeats[3] = game.add.audio('BigBeat4');

		this.chords = [];
		this.chords[0] = game.add.audio('Chord_C_Ab');
		this.chords[1] = game.add.audio('Chord_F_G');
		this.chords[2] = game.add.audio('Chord_G_Eb');

		this.minorBeats = [];
		this.minorBeats[0] = game.add.audio('MinorBeat1');
		this.minorBeats[1] = game.add.audio('MinorBeat2');
		this.minorBeats[2] = game.add.audio('MinorBeat3');
		this.minorBeats[3] = game.add.audio('MinorBeat4');
		this.minorBeats[4] = game.add.audio('MinorBeat5');
		this.minorBeats[5] = game.add.audio('MinorBeat6');

		this.syncoBeats = [];
		this.syncoBeats[0] = game.add.audio('SyncoBeat1');
		this.syncoBeats[1] = game.add.audio('SyncoBeat2');
		this.syncoBeats[2] = game.add.audio('SyncoBeat3');
		this.syncoBeats[3] = game.add.audio('SyncoBeat4');


		this.wolfChord = game.add.audio('WolfChord');
	} 

	HandleBeats(beat, measure) {
		switch (beat) {
			case 0:
				// play a major and minor beat
				randomElement(this.bigBeats).play();
				randomElement(this.minorBeats).play();
				break;

			case 1:
				// play a minor beat
				randomElement(this.minorBeats).play();
				break;

			case 2:
				// play a synco beat
				randomElement(this.syncoBeats).play()
				break;
		}

		if(measure % 8 == 0) {
			// play a chord
			randomElement(this.chords).play();
		}
	}
}

function randomElement(ax) {
	return ax[Math.floor(Math.random()*ax.length)];
}