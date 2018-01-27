class Elder extends Phaser.Sprite {
    constructor(x, y) {
        super(game, x, y, game.atlasName, "alric.png");
        this.anchor.setTo(.5);
        this.speed = 15;
    }

	move(point) {
		if(point.x > this.x) {
		this.movingRight = true;
		} else {
		this.movingLeft = true;
		}
	}

	stopMove() {
		this.movingLeft = false;
		this.movingRight = false;
	}

	update() {
		this._checkWithinBounds();
		this._handleMoving();
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