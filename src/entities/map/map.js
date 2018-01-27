class GameMap extends Phaser.Image {
	constructor() {
		super(game, 0, 0, game.atlasName, "bg.png");
		this._assignInputHandlers();
		this.tint = 0x555555;
		this.detailObjects = this._addMapDetail(10);
	}

	_assignInputHandlers() {
		this.inputEnabled = true;
		this.events.onInputDown.add(() => {
			game.elder.move(game.input.activePointer);
		});
		this.events.onInputUp.add(() => {
			game.elder.stopMove();
		});
	}

	_addMapDetail(maxItems) {
		let detailObjects = [];
		let spacing = game.canvas.width/(maxItems - 2);
		for(let i = 0; i < maxItems; i++) {
			detailObjects.push(this.addChild(game.add.existing(new MapDetailObject(i * spacing, 300, "goober.png"))));
		}

		return detailObjects;
	}
}