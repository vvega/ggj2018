class GlyphMessage extends Phaser.Group {
    constructor(x, y, glyphArr = []) {
        super(game);
        this._setGlyphSequence(glyphArr);
        this.x = x;
        this.y = y;
        this.glyphIdx = 0;
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

            this.children[b].show();
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

        glyphArr.forEach((el, idx) => {
            el.y = this.y;
            el.x = (el.width/2 + 5) * idx;
            el.visible = false;
            this.add(el);
        });
    }
}