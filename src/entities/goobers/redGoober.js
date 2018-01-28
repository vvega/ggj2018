class RedGoober extends BaseGoober {
    constructor(x, y) {
        super(x, y, "goober.png");
        this.tint = 0xff0000;
        this.speed = 3;
        this.moving = true;
        this.range = 130;
        this.rangeCircle = new Phaser.Circle(this.x, this.y, this.range);
        this.state = this.states.IDLE;
        game.clock.signal.add(this._handleRhythm, this);
    }

    _handleRhythm(beat, measure) {
    	//logic for easing/bobbing on beats or whatever?
    }

    update() {
        this.rangeCircle.x = this.x;
        this.rangeCircle.y = this.y;
        switch(this.state) {
            case this.states.IDLE:
                if(!this.destination) {
                    this.destination = this._pickAPoint();
                }
                break;
            case this.states.FLEEING:
                break;

        }
    }

    _pickAPoint() {
        let randAngle = Math.random()*360;
        let destination = this.rangeCircle.circumferencePoint(randAngle);

        if(destination.x < 30) {
            destination.x += this.range/2;
        }

        if(destination.x > game.canvas.width - 30) {
            destination.x -= this.range/2;
        }

        if(destination.y > 300 || destination.y < 100) {
            destination.y = this.y;
        }

        let moveTween = game.add.tween(this).to({ x: destination.x, y: destination.y },
                                                this.speed * Phaser.Point.distance(this, destination),
                                                "Linear", false, Math.random() * Phaser.Timer.SECOND * 1);
        moveTween.onComplete.add(() => this.destination = undefined);
        moveTween.start();

        return destination;
    }
}