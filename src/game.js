"use strict";

(function($) {
	var rtm = $.RTMLayer;

	var gameConfig = {
		width: 3000,
		height: 3000,
		parent: $.document.getElementById('container') || $.document.body,
		callbacks: {
			preBoot: function() {
				rtm.init();
			},
			postBoot: function() {
				game.otherPlayers = [];

				game.onConnect = function(data) {
					game.connected = true;
					game.scene.swap('connecting', 'main');
					game.data = data;
				}.bind(this);	

				rtm.subscribe(rtm.events.CONNECT, game.onConnect);
				this.parent.width = 320;
				this.parent.height = 480;
			}
		},
		scene: [
			{
				key: 'connecting',
				active: true,
				create: function() {
					game.text = this.add.text(55, 200, "Connecting to server...");
				}
			},
			{
				key: 'main',
			    active: false,
			    width: 3000,
			    height: 3000,
			    preload: function() {
					//Note: Object config param doesnt work
					this.load.atlas('textures', './assets/textures.png', './assets/textures.json');
			    },
			    create: function() {
					this.mouse = game.input.activePointer;
					var bg = this.add.image(350, 350, 'textures', 'bg.png');
					bg.setPosition(bg.width/2, bg.height/2);

					this.spawnPlayer = function(data) {
						if(!this.player) {
							this.player = new PlayerHero(this, 160, 250);
						} else {
							this.otherPlayers.push(new Hero(this, 160, 250));
						}

						rtm.onSpawn({ player: this.player });
					};

					this.spawnPlayer(game.data);

					this.cameras.main.setBounds(0, 0, game.canvas.width, game.canvas.height);
					this.cameras.main.useBounds = true;
					this.cameras.main.setViewport(0, 0, 320, 480);
			    },
			    update: function() {
					this.mouse.justDown && this.player.move(this.mouse.x, this.mouse.y);
					this.player && this.player.update();
			    }
			}
		]
	}

	var game = $.game = new Phaser.Game(gameConfig);

}(this))