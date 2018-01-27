class BaseGoober extends Phaser.Sprite {
    constructor(x, y, texture) {
        super(game, x, y, game.atlasName, texture);
        this.anchor.setTo(.5);
        this.scale.setTo(.5);
    }
}