class GameMap extends Phaser.Image {
	constructor() {
		super(game, 0, 0, game.atlasName, "bg.png");
		this._assignInputHandlers();
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
}