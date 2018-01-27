class Elder extends Phaser.Sprite {

    constructor(x, y) {
        super(game, x, y, game.atlasName, "elder.png");
        this.anchor.setTo(.5);
        this.scale.setTo(.6);
        this.speed = 15;
        this.targetGoober = game.testGoober;
		this.lineOfSight = new Phaser.Line(x, y, this.targetGoober.x, this.targetGoober.y);
    }

	move(point) {
		if(point.x > this.x) {
			this.movingRight = true;
		} else {
			this.movingLeft = true;
		}
	}

	issueCommand(glyphMessage) {
		//TODO: issue command to goober
		console.log("issuing command")
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

		this._updateLineOfSight();
	}

	_checkWithinBounds() {
		if(this.x > game.canvas.width - this.width) {
			this.movingRight = false;
		}

		if(this.x < this.width) {
			this.movingLeft = false;
		}
	}

	_updateLineOfSight() {
		this.lineOfSight.setTo(this.x, this.y, this.targetGoober.x, this.targetGoober.y);
		this.lineOfSight.obstructed = game.map.detailObjects.filter((entity) => Phaser.Line.intersectsRectangle(this.lineOfSight, entity)).length > 0;
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