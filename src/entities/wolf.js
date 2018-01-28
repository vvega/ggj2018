class Wolf extends Phaser.Sprite {

    constructor(x, y, goober) {
        super(game, x, y, game.atlasName, "wolf.png");
        this.anchor.setTo(.5);
        this.scale.setTo(.6);
        this.speed = 1;
        this.targetGoober = goober;
        this.combatRadius = this.scale.x * this.width/2;
        game.time.events.loop(Phaser.Timer.SECOND * 3, this._slowUpdate, this);
    }

    _targetVector() {
    	let x = this.targetGoober.x - this.x;
    	let y = this.targetGoober.y - this.y;

    	let mag = Math.sqrt(x*x + y*y);

    	return [x/mag, y/mag, mag];
    }

	update() {

		if(!this.targetGoober || !this.targetGoober.vulnerable) {
			// run off, nothing to eat...
			console.log("Wolf is done hunting");
			return;
		} else {
			this._handleMoving();
		}

		if(this._targetVector()[2] < this.combatRadius) {
			this._eatGoober(this.targetGoober);
		}
	}

	_slowUpdate() {
		if(!this.targetGoober) {
			this.targetGoober = this._getNextGoober();
			if (this.targetGoober) console.log("Wolf has resumed hunting");
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
		let v = this._targetVector();
		let dx = v[0] * this.speed;
		let dy = v[1] * this.speed;
		this.x += dx;
		this.y += dy;
	}

	_eatGoober() {
		this.targetGoober.die();
		this.targetGoober = undefined;
	}

	_getNextGoober() {
		let goober = game.goobers.shift();
		return goober;
	}
}