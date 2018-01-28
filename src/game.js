"use strict";

let debugMode = 1;

(function($) {
	console.log("hello world!")
	//experimental use of Satori for multiplayer if needed
	var rtm = $.RTMLayer;


	var game = $.game = new Phaser.Game(800, 600, Phaser.AUTO, '', new LoadState());


}(this))