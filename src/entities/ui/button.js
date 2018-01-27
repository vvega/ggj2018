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
		this.glyphMessage.position.setTo(25, -60);
		this.glyphMessage.showAll();
	}
}