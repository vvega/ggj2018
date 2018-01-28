class GlyphMessage extends Phaser.Group {
    constructor(x, y, glyphArr = []) {
        super(game);
        this._setGlyphSequence(glyphArr);
        this.x = x;
        this.y = y;
        this.glyphIdx = 0;
        this.glyphIDs = glyphArr.map(x => x.id);
        this.scale.setTo(.7);
    }

    startShowSequence(glyphArr = []) {
        if(glyphArr.length) {
            this._setGlyphSequence(glyphArr);
        }

        this.tickHandler = game.clock.signal.add((b, m) => {
            if(b >= this.children.length) {
                this.hideAll();
                return;
            }

            if(this.parent.lineOfSight && !this.parent.lineOfSight.obstructed) {
                this.children[b].show();
                if(game.musicManager.glyphChatter[this.children[b].id]) {
                    game.musicManager.glyphChatter[this.children[b].id].play();
                }
            }
        });
    }

    showAll() {
        this.children.forEach((el) => (el.visible = true));
    }

    hideAll() {
        this.children.forEach((el) => (el.visible = false));
    }

    _setGlyphSequence(glyphArr = []) {
        this.children.forEach((el) => {
            this.remove(el);
        })

        this.glyphIDs = glyphArr.map(x => x.id);

        glyphArr.forEach((el, idx) => {
            el.y = this.y;
            el.x = (el.width/2 + 5) * idx;
            el.visible = false;
            this.add(el);
        });
    }
}
