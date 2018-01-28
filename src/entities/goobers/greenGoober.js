class GreenGoober extends BaseGoober {
    constructor(x, y) {
        super(x, y, "goober.png");
        this.tint = 0xa5ffc3;
        this.speed = 3;
        this.moving = true;
        this.walkAnim.play(24, true);
        game.clock.signal.add(this._handleRhythm, this);
    }

    _handleRhythm(beat, measure) {
    	//logic for easing/bobbing on beats or whatever?
    }

	_checkWithinBounds() {
		if(this.x > game.canvas.width - this.width || this.x < this.width) {
			this.speed *= -1;
		}
	}

    update() {
    	super.update();
    	this._checkWithinBounds();
    	if (this.moving) this.x += this.speed;
    }
}