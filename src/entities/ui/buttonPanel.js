class ButtonPanel extends Phaser.Image {
	constructor(x, y) {
		super(game, x, y, game.atlasName, "shelf.png");
		this.x = x;
		this.y = y;
		this.anchor.setTo(0, .5);
		this.scale.setTo(.5);
		this.buttons = [];

		this._buildHand();
	}

	_buildHand(glyphMessages) {
		//TODO: Generate hand here
		let spacing = this.width * .37;
		for(let i = 0; i < 5; i++) {
			let glyphMessage = new GlyphMessage(0, 0, [new Glyph(0, 0),
				                                       new Glyph(0, 0),
				                                       new Glyph(0, 0)]);
			this.buttons.push(this.addChild(new Button((spacing * i) + 60, 65, glyphMessage)));
		}
	}

	replaceInHand(button, glyphMessage) {
		
	}
}