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
    }

	move(point) {
		if(point.x > this.x) {
			this.movingRight = true;
		} else {
			this.movingLeft = true;
		}
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

		if(!this.targetGoober) {
			return;
		}
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