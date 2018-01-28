class Button extends Phaser.Image {
	constructor(x, y, glyphMessage) {
		let upTexture = "button_glyph.png";
		super(game, x, y, game.atlasName, upTexture);
		this.shownY = y;
		this.anchor.setTo(0, .5);
		this.scale.setTo(.9);
		this.upTexture = upTexture;
		this.downTexture = "button_glyphdown.png";
		this.inputEnabled = true;

		this._addGlyphMessage(glyphMessage);

		this._setupInput();
	}

	_setupInput() {
		this.events.onInputDown.add(() => {
			this.drop();
			this.loadTexture(game.atlasName, this.downTexture);
			this.glyphMessage.y += 5;
		});
		this.events.onInputUp.add(() => {
			game.elder.issueCommand(this.glyphMessage);
			randomElement(game.musicManager.elderChatter).play();
			this.loadTexture(game.atlasName, this.upTexture);
			this.glyphMessage.y -= 5;
		});
	}

	_addGlyphMessage(glyphMessage) {
		this.glyphMessage = this.addChild(glyphMessage);
		this.glyphMessage.position.setTo(25, -65);
		this.glyphMessage.showAll();
	}

	drop() {
		this.moveTween = game.add.tween(this).to({y: 900}, 1000, Phaser.Easing.Linear.InOut, true);
		game.buttonDropped.dispatch(this);
	}

	resurface(newGlyphMessage) {
		if(this.moveTween.isRunning) {
			//Pop back up if successful rescue
			game.tweens.remove(this.moveTween);
			this.moveTween = game.add.tween(this).to({y: 900}, 300, Phaser.Easing.Linear.InOut);
			this.moveTween.onComplete.add(() => {
				this._addGlyphMessage(newGlyphMessage);
				game.add.tween(this).to({y: this.shownY}, 300, Phaser.Easing.Linear.InOut, true);
			}, this);
			this.moveTween.start();
		} else {
			this._addGlyphMessage(newGlyphMessage);
			this.moveTween = game.add.tween(this).to({y: this.shownY}, 1000, Phaser.Easing.Linear.InOut, true);
		}
	}

}