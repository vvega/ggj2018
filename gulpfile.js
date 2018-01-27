"use strict";

let fs = require('fs');
let gulp = require('gulp');
let babel = require('gulp-babel');
let uglify = require('gulp-uglify');
let insert = require('gulp-insert');
let rename = require('gulp-rename');
let concat = require('gulp-concat');
let del = require('del');
let command = require('gulp-run-command').default;

let files = ["./node_modules/phaser-ce/build/phaser.js", "./lib/rtm/dist/rtm.min.js", "./src/**/*.js"];

gulp.task("build:phaser",
		command([
			'npm install',
			'npm run build'
		],
		{
			cwd : './node_modules/phaser/'
		})
);

gulp.task("build:rtm",
	command([
			'npm install',
			'gulp'
		],
		{
			cwd : './lib/rtm/'
		})
);

gulp.task("clean", function() {
	return del(["./temp"])
})

gulp.task("move:html", ["clean", /*"build:rtm", "build:phaser"*/], function() {
	return gulp.src("./src/game.html")
			.pipe(rename("index.html"))
			.pipe(gulp.dest("./dist/"))
});

gulp.task("move:json", ["move:html"], function() {
	return gulp.src("./src/assets/textures.json")
			.pipe(gulp.dest("./dist/assets/"))
});

gulp.task("move:png", ["move:json"], function() {
	return gulp.src(["./src/assets/textures.png"])
			.pipe(gulp.dest("./dist/assets/"))
});

gulp.task("move:audio", ["clean"], function() {
	return gulp.src(["./src/assets/sounds/**/*.ogg"])
			.pipe(gulp.dest("./dist/assets/sounds/"))
});

gulp.task("concat", ["move:png"], function() {
	return gulp.src(files)
		.pipe(concat("game.js"))
		.pipe(gulp.dest("./temp/"))
});

gulp.task("default", ["concat", "move:audio"], function() {
	return gulp.src("./temp/game.js")
		//.pipe(insert.prepend("window.assets = "+JSON.stringify(assets)+";"))
		.pipe(rename("game.min.js"))
		.pipe(gulp.dest("./dist/"))
});

gulp.task("deploy", ["concat"], function() {
	return gulp.src("./temp/game.js")
			.pipe(insert.prepend(assets))
			.pipe(babel({
				presets: ["es2015"]
			}))
			.pipe(uglify())
			.pipe(rename('game.min.js'))
			.pipe(gulp.dest("dist/"))
});