class Clock {
	constructor() {
		this.beatLength = 300; // in ms
		this.measureLength = 3; // in beats
		this.beat = 0;
		this.measure = 0;
		this.signal = new Phaser.Signal();
		this.timer = game.time.create(false);
		this.timer.loop(this.beatLength, this.beatHandler, this);
		this.timer.start();
	}

	beatHandler() {
		++this.beat;
		if(this.beat % this.measureLength == 0) { // new measure
			++this.measure;
			this.beat = 0;
		}
		this.signal.dispatch(this.beat, this.measure);
	}
}
