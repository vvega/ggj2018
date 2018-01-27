class MusicManager {
	constructor () {
		game.clock.signal.add(MusicManager.HandleBeats);
	}

	static HandleBeats(beat, measure) {
		switch (beat) {
			case 0:
			break;

			case 1:
			break;

			case 2:
			break;
		}

		
	}
}