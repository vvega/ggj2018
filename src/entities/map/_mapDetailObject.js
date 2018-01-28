class MapDetailObject extends Phaser.Sprite {
	constructor(x, y, texture = '') {
		super(game, x, y, game.atlasName, texture);
        this.anchor.setTo(.5);
		this.boundingLine = new Phaser.Line(this.x - this.width/2, this.y, this.x + this.width/2, this.y);
	}

	update() {
		this.boundingLine.setTo(this.x - this.width/2, this.y, this.x + this.width/2, this.y);
	}

	move() {
		let dX = (Math.random() * this.range) * (Math.random() > .5 ? -1 : 1);
		let destX = this.x + dX;

		if(destX > game.canvas.width
			|| destX < 0) {
			destX = this.x - dX;
		}

		game.tweens.remove(this.moveTween);
		this.moving = true;
		this.anim.play(15, true);

		this.scale.x = this.origScaleX * (destX > this.x ? -1 : 1);

		this.moveTween = game.add.tween(this).to({x: destX }, (4000/this.speed), "Linear", true);
		this.moveTween.onComplete.add(this.stopMove, this);
	}

	stopMove() {
		this.animations.stop(null, true);
		this.moving = false;
	}
}