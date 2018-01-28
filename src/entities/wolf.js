class Wolf extends Phaser.Sprite {

    constructor(x, y, goober) {
        super(game, x, y, game.atlasName, "wolf.png");
        this.anchor.setTo(.5);
        this.scale.setTo(.7);
        this.origScaleX = .7;
        this.speed = 1;
        this.targetGoober = goober;
        this.combatRadius = this.scale.x * this.width/2;
        game.time.events.loop(Phaser.Timer.SECOND * 3, this._slowUpdate, this);
        this.idleAnim = this.animations.add("idle", Phaser.Animation.generateFrameNames('animations/wolf/idle/wolfidle_', 1, 10, ".png", 2));
    	this.walkAnim = this.animations.add("walk", Phaser.Animation.generateFrameNames('animations/wolf2/walk/wolfwalk_', 1, 4, ".png", 2));
    	this.preIdleAnim = this.animations.add("preIdle", Phaser.Animation.generateFrameNames('animations/wolf2/revert/wolfrevert_', 1, 5, ".png", 2));
    	this.preWalkAnim = this.animations.add("preWalk", Phaser.Animation.generateFrameNames('animations/wolf2/transform/wolftransform_', 1, 6, ".png", 2));

    	this.idleAnim.play(12);

    	this.preIdleAnim.onComplete.add(() => {
    		this.idleAnim.play(12, true);
    		this.preIdleAnim.stop(true);
    	});

    	this.preWalkAnim.onComplete.add(() => {
    		this.walkAnim.play(12, true);
    		this.preIdleAnim.stop(true);
    	});
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
			
			return;
		} else {
			this._handleMoving();

			if(!(this.walkAnim.isPlaying || this.preWalkAnim.isPlaying)) {
				this.preWalkAnim.play(12);
			}
		}

		if(this._targetVector()[2] < this.combatRadius) {
			this._eatGoober(this.targetGoober);
		}
	}

	_slowUpdate() {
		if(!this.targetGoober || !this.targetGoober.vulnerable) {
			this.targetGoober = this._getNextGoober();
			if (this.targetGoober) {
				if(this.targetGoober.vulnerable) {
					console.log("Wolf has resumed hunting");
					
				} else {
					console.log("Wolf found a non-eligible goober, waiting");
					if(!this.idleAnim.isPlaying) {
						this.preIdleAnim.play(12);
						this.walkAnim.stop(true);
					}
				}
			} else {
				console.log("Wolf could not find target, waiting");
				if(!this.idleAnim.isPlaying) {
					this.preIdleAnim.play(12);
					this.walkAnim.stop(true);
				}
			}
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

		if(dx > 0) {
			this.scale.x = this.origScaleX * -1;
		} else {
			this.scale.x = this.origScaleX;
		}
	}

	_eatGoober() {
		this.targetGoober.die();
		this.targetGoober = undefined;
		console.log("Wolf ate goober");
	}

	_getNextGoober() {
		let goober = game.goobers.shift();
		return goober;
	}
}