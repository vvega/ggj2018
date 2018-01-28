class ScoreBoard extends Phaser.Group {
	constructor(x, y) {
		super(game);
		this.deathCounter = game.add.text(30, 0, "Dead:", { fill: "#FFFFFF", fontSize: 35 });
		this.rescuedCounter = game.add.text(580, 0, "Rescued:", { fill: "#FFFFFF", fontSize: 35 });
	}

	update() {
		this.deathCounter.text = "Dead: "+ game.numDead;
		this.rescuedCounter.text = "Rescued: "+ game.numRescued;
	}
}