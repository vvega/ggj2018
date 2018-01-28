class Elder extends Phaser.Sprite {

    constructor(x, y) {
        super(game, x, y, game.atlasName, "elder.png");
        this.anchor.setTo(.5);
        this.scale.setTo(.6);
        this.speed = 15;
		this.signal = new Phaser.Signal();
		this.game.rsignal.add((el) => {
			//TODO: lets find another one?
			this.targetGoober = undefined;
		});
		this.selectedIndicator = game.add.existing(this._createSelectionIndicator());
		this.selectedIndicator.visible = false;
		this.targetGoober = undefined;
		game.add.tween(this.selectedIndicator).to({ alpha: .4}, 500, "Linear", true, 0, -1, true);
		game.add.tween(this.selectedIndicator.scale).to({ x: 1.9, y: 1.1 }, 500, "Linear", true, 0, -1, true);
    }

	move(point) {
		if(point.x > this.x) {
			this.movingRight = true;
		} else {
			this.movingLeft = true;
		}
	}

	_createSelectionIndicator() {
		let selectionGraphics = game.add.graphics();
		selectionGraphics.beginFill(0x00deff, 1);
		selectionGraphics.drawCircle(0, 0, 50);

		let image = new Phaser.Image(game, 0, 0, selectionGraphics.generateTexture());
		selectionGraphics.destroy();
		image.scale.y = .7;
		image.scale.x = 1.5;
		image.alpha = .9;
		image.anchor.setTo(.5);
		return image;
	}

	issueCommand(glyphMsg) {
		this.signal.dispatch(glyphMsg);
	}

	stopMove() {
		this.movingLeft = false;
		this.movingRight = false;
	}

	update() {
		this._checkWithinBounds();
		this._handleMoving();

		if(!this.targetGoober || !this.targetGoober.vulnerable) {
			this.selectedIndicator.visible = false;
			this.targetGoober = this._getNextGoober();
		} 

		if(this.targetGoober) {
			this.selectedIndicator.visible = true;
			this.selectedIndicator.position.setTo(this.targetGoober.x, this.targetGoober.y - 10);
		}
	}

	_getNextGoober() {
		let goober = game.goobers.shift();
		if(goober) {
			goober.alert();
		}
		return goober;
	}

	_checkWithinBounds() {
		if(this.x > game.canvas.width - this.width) {
			this.movingRight = false;
		}

		if(this.x < this.width) {
			this.movingLeft = false;
		}
	}

	_handleMoving() {
		if(this.movingLeft) {
			this.x -= this.speed;
		}

		if(this.movingRight) {
			this.x += this.speed;
		}
	}
}