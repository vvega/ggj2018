class Glyph extends Phaser.Image {
    constructor(x, y) {
        var id = Math.ceil(Math.random()*5);
        super(game, x, y, game.atlasName, `glyph_0${id}.png`);
        this.id = id;
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