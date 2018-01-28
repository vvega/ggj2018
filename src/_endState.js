class EndState extends Phaser.State {
	constructor() {
		super();
	}

	create() {
		let bg = game.add.image(0, 0, game.atlasName, "bg.png");
		bg.scale.setTo(.5);
		game.add.tween(bg).to({alpha: .3}, 1000, Phaser.Easing.Linear.InOut, true);

		let text = game.add.text(390, 110, "You have failed your people\nas an elder.", { font: "Papyrus, fantasy", fill: "#FFFFFF", fontSize: 52, align: "center"});
		text.anchor.setTo(.5);

		let elder = game.add.existing(new Elder(game.elder.x, game.elder.y));
		game.add.tween(elder.scale).to({x: 1.5, y: 1.5}, 2000, Phaser.Easing.Exponential.InOut, true);
		game.add.tween(elder).to({x: game.canvas.width/2, y: game.canvas.height - 215}, 2000, Phaser.Easing.Exponential.InOut, true);
	}
}