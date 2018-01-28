class GameMap extends Phaser.Image {
	constructor() {
		super(game, 0, 0);
		this.bg = this.addChild(game.add.image(0, 0, game.atlasName, "bg.png"));
		this.bg.scale.setTo(.5);
		this._assignInputHandlers();
		this.movingChoices = [PigBunny, SlugDog];
		this.staticChoices = [Tree, Vines, Pit];
		this.instantChoices = [Fwurm];
		this.detailObjects = [];
	}

	_assignInputHandlers() {
		this.inputEnabled = true;
		this.events.onInputDown.add(() => {
			game.elder.move(game.input.activePointer);
		});
		this.events.onInputUp.add(() => {
			game.elder.stopMove();
		});
	}

	addMapObstructions(maxStatic, maxMoving, maxInstant) {
		let choiceIdx;
		for(let i = 0; i < maxStatic; i++) {
			choiceIdx = Math.floor(Math.random()*this.staticChoices.length);
			this.detailObjects.push(game.add.existing(new this.staticChoices[choiceIdx](Math.random()*game.canvas.width, 200 + Math.random()*150)));
		}

		for(let i = 0; i < maxMoving; i++) {
			choiceIdx = Math.floor(Math.random()*this.movingChoices.length);
			this.detailObjects.push(game.add.existing(new this.movingChoices[choiceIdx](Math.random()*game.canvas.width, 200 + Math.random()*150)));
		}

		for(let i = 0; i < maxInstant; i++) {
			choiceIdx = Math.floor(Math.random()*this.instantChoices.length);
			this.detailObjects.push(game.add.existing(new this.instantChoices[choiceIdx](Math.random()*game.canvas.width, 200 + Math.random()*150)));
		}
	}
}