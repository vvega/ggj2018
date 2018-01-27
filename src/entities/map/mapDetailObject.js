class MapDetailObject extends Phaser.Sprite {
	constructor(x, y, texture) {
		super(game, x, y, game.atlasName, texture);
		this.scale.setTo(.3 + (Math.random() * .2));
		this.boundingLine = new Phaser.Line(this.x - this.width/4, this.y, this.x + this.width/4, this.y);
	}

	update() {
		//this.boundingLine.setTo(this.x - this.width/4, this.y, this.x + this.width/4, this.y);
	}
}