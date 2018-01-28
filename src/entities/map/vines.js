class Vines extends MapDetailObject {
	constructor(x, y) {
		super(x, y, 'animations/vines/vines02.png');
        this.anchor.setTo(.5, 0);
        let scale =  Math.random()*.5 + .3;
        this.scale.setTo(scale, scale * -1);
	}
}