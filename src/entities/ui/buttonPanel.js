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
		game.buttonDropped = new Phaser.Signal();
		game.buttonDropped.add((button) => {
			this.openSlots.push(button);
		}, this);

		this._buildHand();
	}

	_buildHand(glyphMessages) {
		let spacing = this.width * .37;
		let glyphMessage;
		for(let i = 0; i < 5; i++) {
			//XXX
			/*if(game.gooberMessages.length) {
	            glyphMessage = game.panelMessages[0];
	            game.gooberMessages.shift();
	        } else {*/
	            glyphMessage = game.glyphMessageGen.getNewGlyphMessage();
	        /*}*/

			this.buttons.push(this.addChild(new Button((spacing * i) + 60, 65, glyphMessage)));
		}
	}

	_onRescue(msg) {
		if(msg=="rescued") {
			console.log(this, "rescu")
			let newCard = this.openSlots.pop();
			newCard.resurface(game.glyphMessageGen.getNewGlyphMessage());
			console.log("resurfacing", newCard);
		}
	}

	replaceInHand(button, glyphMessage) {
		
	}
}