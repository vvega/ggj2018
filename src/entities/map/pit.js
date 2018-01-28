class Pit extends MapDetailObject {
	constructor(x, y) {
		super(x, y, 'spikepit.png');
        this.anchor.setTo(.5, .8);
        let scale =  Math.random()*.5 + .8;
        this.anchor.setTo(scale, 0);
        this.combatRadius = this.width/4;
	}

	update() {
		game.goobers.forEach( (x) => {
			if(this._targetVector(x)[2] < this.combatRadius) {
				this._eatGoober(x);
			}
		});
	}

	_eatGoober(x) {
		if(x.vulnerable) {
			x.die();
			x = undefined;
			console.log("Goober fell into pit");
		}
	}

	_targetVector(target) {
    	let x = target.x - this.x;
    	let y = target.y - this.y;

    	let mag = Math.sqrt(x*x + y*y);

    	return [x/mag, y/mag, mag];
    }
}