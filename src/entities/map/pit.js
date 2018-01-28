class Pit extends MapDetailObject {
	constructor(x, y) {
		super(x, y, 'spikepit.png');
        this.anchor.setTo(.5, .8);
        let scale =  Math.random()*.5 + .8;
        this.anchor.setTo(scale, 0);
	}
}