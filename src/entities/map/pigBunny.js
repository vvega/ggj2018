class PigBunny extends MapDetailObject {
	constructor(x, y) {
		super(x, y, 'animations/pigbunny/pigbunny01.png');
		this.anim = this.animations.add("anim", Phaser.Animation.generateFrameNames('animations/pigbunny/pigbunny', 1, 6, ".png", 2), true); 
		this.scale.setTo((.35 + (Math.random() * .2)));
        this.anchor.setTo(.5, 1);
        this.range = 200;
        this.speed = 5;
        this.origScaleX = this.scale.x;
        game.time.events.loop((Math.random() * Phaser.Timer.SECOND * 2) + Phaser.Timer.SECOND, this.move, this);
	}
}