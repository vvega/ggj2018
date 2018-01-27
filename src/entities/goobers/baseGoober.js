class BaseGoober extends Phaser.Sprite {
    constructor(x, y, texture = "goober.png") {
        super(game, x, y, game.atlasName, texture);
        this.anchor.setTo(.5);
        this.scale.setTo(.5);
        this.message = this.addChild(new GlyphMessage(-this.width*2, -this.height*2));
    }

    alert(glyphArr) {
        this.message.startShowSequence([new Glyph(0, 0),
                                        new Glyph(0, 0),
                                        new Glyph(0, 0)]);
    }

    stopAlert() {
        this.message.hide();
    }
}