class Fwurm extends MapDetailObject {
	constructor(x, y) {
		super(x, y, 'animations/fwurms/fwurms01.png');
		this.anim = this.animations.add("anim", Phaser.Animation.generateFrameNames('animations/fwurms/fwurms', 0, 12, ".png", 2)); 
        this.anchor.setTo(.5, 1);
        this.scale.setTo(Math.random()*.5 + .8)
        this.boundingLineWidth = 0;
        game.time.events.loop((Math.random() * Phaser.Timer.SECOND * 2) + Phaser.Timer.SECOND * 8, this.popUp, this);
	}

	update() {
		this.boundingLine.setTo(this.x - this.boundingLineWidth/2, this.y, this.x + this.boundingLineWidth/2, this.y);
	}

	popUp() {
		this.anim.play(12);
		this.boundingLineWidth = this.width/3;
		this.anim.onComplete.add(() => {
			this.boundingLineWidth = 0;
		})
	}
}