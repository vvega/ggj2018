class Glyph extends Phaser.Image {
    constructor(x, y) {
        super(game, x, y, game.atlasName, `glyph_0${Math.ceil(Math.random()*5)}.png`);
        this.orig = {
            x: x,
            y: y
        }
    }

    show() {
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }
}