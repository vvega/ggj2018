class BaseGoober extends Phaser.Sprite {
    constructor(x, y, texture = "goober.png") {
        super(game, x, y, game.atlasName, texture);
        this.anchor.setTo(.5);
        this.scale.setTo(.8);

        this.message = this.addChild(new GlyphMessage(-115, -80));

        game.elder.signal.add(this._handleSpell, this);

        this.lineOfSight = new Phaser.Line(this.x, this.y, this.game.elder.x, this.game.elder.y);
    }

    alert(glyphArr) {
        this.message.startShowSequence([new Glyph(0, 0, 1),
                                        new Glyph(0, 0, 2),
                                        new Glyph(0, 0, 3)]);
    }

    update() {
        this._updateLineOfSight();
    }

    stopAlert() {
        this.message.hide();
    }

    _updateLineOfSight() {
        this.lineOfSight.setTo(this.x, this.y, game.elder.x, game.elder.y);
        this.lineOfSight.obstructed = game.map.detailObjects.filter((entity) => Phaser.Line.intersectsRectangle(this.lineOfSight, entity)).length > 0;
    }

    _handleSpell(glyphMsg) {
        // handle incoming GlyphMessage
        if (this.message.glyphIDs.length != glyphMsg.glyphIDs.length) {
            // this should never happen
            console.log("GlyphMessage lengths not equal, which should never happen (ignoring)");
        }
        for(var i = 0; i < glyphMsg.glyphIDs.length; i++) {
            if (this.message.glyphIDs[i] != glyphMsg.glyphIDs.length) {
                // wrong spell, nothing happens
            }
        }
        // if we're here, we got the right spell and are rescued
        this._getRescued();
    }

    _getRescued() {
        // give a new spell card to the Elder
        // animate rescue
        console.log("Goober rescued");
    }
}