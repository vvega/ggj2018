class SlugDog extends MapDetailObject {
	constructor(x, y) {
		super(x, y, 'animations/slugdog/slugdogwalk00.png');
		this.anim = this.animations.add("anim", Phaser.Animation.generateFrameNames('animations/slugdog/slugdogwalk', 0, 6, ".png", 2), true); 
		this.scale.setTo((.35 + (Math.random() * .2)));
        this.anchor.setTo(.5, 1);
        this.origScaleX = this.scale.x;
        this.speed = 2;
        this.range = 150;
        game.time.events.loop((Math.random() * Phaser.Timer.SECOND * 2) + Phaser.Timer.SECOND * 2, this.move, this);
	}
}