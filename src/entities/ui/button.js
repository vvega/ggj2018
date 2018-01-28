class Button extends Phaser.Image {
	constructor(x, y, glyphMessage) {
		let upTexture = "button_glyph.png";
		super(game, x, y, game.atlasName, upTexture);
		this.anchor.setTo(0, .5);
		this.scale.setTo(.9);
		this.upTexture = upTexture;
		this.downTexture = "button_glyphdown.png";
		this.inputEnabled = true;

		this.glyphMessage = this.addChild(glyphMessage);
		this.glyphMessage.position.setTo(25, -65);
		this.glyphMessage.showAll();

		this._setupInput();
	}

	_setupInput() {
		this.events.onInputDown.add(() => {
			this.loadTexture(game.atlasName, this.downTexture);
			this.glyphMessage.y += 5;
			game.elder.issueCommand(this.glyphMessage);
		});
		this.events.onInputUp.add(() => {
			this.loadTexture(game.atlasName, this.upTexture);
			this.glyphMessage.y -= 5;
		});
	}
}