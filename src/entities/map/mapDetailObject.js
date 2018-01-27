class MapDetailObject extends Phaser.Sprite {
	constructor(x, y, texture) {
		super(game, x, y, game.atlasName, texture);
		this.scale.setTo(.35 + (Math.random() * .2));
        this.anchor.setTo(.5);
		this.boundingLine = new Phaser.Line(this.x - this.width/2, this.y, this.x + this.width/2, this.y);
	}

	update() {
		this.boundingLine.setTo(this.x - this.width/2, this.y, this.x + this.width/2, this.y);
	}
}