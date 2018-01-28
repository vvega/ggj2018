class ButtonPanel extends Phaser.Image {
	constructor(x, y) {
		super(game, x, y, game.atlasName, "shelf.png");
		this.x = x;
		this.y = y;
		this.anchor.setTo(0, .5);
		this.scale.setTo(.5);
		this.buttons = [];

		this.openSlots = [];

		game.rsignal.add(this._onRescue, this);

		this._buildHand();
	}

	_buildHand(glyphMessages) {
		//TODO: Generate hand here
		let spacing = this.width * .37;
		let g123 = this._createNewCard([1,2,3]);
		this.buttons.push(this.addChild(new Button(60, 65, g123)));
		for(let i = 1; i < 5; i++) {
			let glyphMessage = this._createNewCard();
			this.buttons.push(this.addChild(new Button((spacing * i) + 60, 65, glyphMessage)));
		}
	}

	_onrescue(msg) {
		if(msg=="rescued") {
			// add a card to hand
			//var position = this.openSlots.pop();
		}
	}

	_createNewCard(ids) {
		if(ids) {
		return new GlyphMessage(0, 0, [new Glyph(0, 0, ids[0]),
			                          new Glyph(0, 0, ids[1]),
					                  new Glyph(0, 0, ids[2])]);
		} else {
			return new GlyphMessage(0, 0, [new Glyph(0, 0),
			                              new Glyph(0, 0),
					                      new Glyph(0, 0)]);
		}
	}

	replaceInHand(button, glyphMessage) {
		
	}
}