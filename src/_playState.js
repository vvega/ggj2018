class PlayState extends Phaser.State {
	constructor() {
		super();
	}
	create() {
		//Initialize stuff here
		game.numDead = 0;
		game.numRescued = 0;
		game.maxDead = 5;

		game.maxGoobers = 5;

		game.state.add("end", new EndState());
		game.clock = new Clock();
		game.clock.signal.add(function(b, m) { this.measure = m; this.beat = b; }, game.clock);

		game.musicManager = new MusicManager();
		game.glyphMessageGen = new GlyphMessageGenerator();

		game.rsignal = new Phaser.Signal();

		game.map = game.add.existing(new GameMap(0,0));
		[game.panelMessages, game.gooberMessages] =[[],[]]// game.glyphMessageGen.generateInitialGlyphMessages();
		game.elder = game.add.existing(new Elder(game.canvas.width/2, game.canvas.height - 155));
		game.testGoober = game.add.existing(new GreenGoober(130, 220));

		//TODO: populate goobers via spawn 
		game.goobers = [game.testGoober,
						game.add.existing(new RedGoober(130, 280)),
					    game.add.existing(new GreenGoober(160, 190)),
					    game.add.existing(new GreenGoober(200, 310)),
					    game.add.existing(new RedGoober(430, 280))];

		game.testWolf = game.add.existing(new Wolf(100, 100, game.testGoober));
		
		game.map.addMapObstructions(1, 1, 1);

		game.ui = game.add.existing(new GameUI(0, 0));

		game.time.events.loop(Phaser.Timer.SECOND/3, () => {
			game.world.sort("y", Phaser.Group.SORT_ASCENDING);
		}, this);

		game.time.events.loop(Phaser.Timer.SECOND * 3, this._slowUpdate, this);

		game.endGame = () => {
			$.elderPosition = game.elder.position;
			this.state.start("end");
		};

	}

	render() {
		//game.debug.text(game.clock.measure + ":" + game.clock.beat, 32, 96, "fuchsia");
		//game.testGoober.alive && game.debug.geom(game.testGoober.lineOfSight, game.testGoober.lineOfSight.obstructed ? 'rgba(255,0,0,1)' : 'rgba(0,255,0,1)');
		/*game.map.detailObjects && game.map.detailObjects.forEach(function(el) {
			game.debug.geom(el.boundingLine, 'rgba(255,255,0,1)');
		});*/
	}

	_slowUpdate() {
		if (game.goobers.length < game.maxGoobers) {
			let spawnx = randomElement([130, 160, 200, 430]);
			let spawny = randomElement([100, 190, 280, 310]);
			if(Math.random() <= 0.5) {
				let g = game.add.existing(new RedGoober(spawnx, spawny));
				game.goobers.push(g);
				console.log("Spawned red goober");
					    
			} else {
				let g = game.add.existing(new GreenGoober(spawnx, spawny));
				game.goobers.push(g);
				console.log("Spawned green goober");
			}
		}
		
	}
}