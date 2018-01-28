class Tree extends MapDetailObject {
	constructor(x, y) {
		super(x, y, 'treessm.png');
        this.anchor.setTo(.5, .7);
        this.scale.setTo(Math.random()*.7 + .8)
	}

	update() {
		this.boundingLine.setTo(this.x - this.width/4, this.y, this.x + this.width/4, this.y);
	}
}