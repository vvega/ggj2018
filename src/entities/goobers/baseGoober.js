class BaseGoober extends Phaser.Sprite {
    constructor(x, y, texture = "goober.png") {
        super(game, x, y, game.atlasName, texture);
        this.states = {
            IDLE: 1,
            FLEEING: 2
        };

        this.anchor.setTo(.5, 1);
        this.scale.setTo(.8);
        this.vulnerable = true;
        //XXX
        if(game.gooberMessages.length) {
            this.message = this.addChild(game.gooberMessages.shift());
            ;
        } else {
            this.message = this.addChild(game.glyphMessageGen.getNewGlyphMessage());
        }
        
        this.message.position.setTo(-120, -175)

        game.elder.signal.add(this._handleSpell, this);

        this.lineOfSight = new Phaser.Line(this.x, this.y, this.game.elder.x, this.game.elder.y);
    }

    alert() {
        this.message.startShowSequence();
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
            return;
        }

        if(!this.alive) {
            console.log("I'm dead/rescued already, dont care");
            return;
        }

        for(var i = 0; i < glyphMsg.glyphIDs.length; i++) {
            var mine = this.message.glyphIDs[i];
            var yours = glyphMsg.glyphIDs[i];
            if (mine != yours) {
                // wrong spell, nothing happens
                console.log("Spell wasted:" + glyphMsg.glyphIDs);
                return 0;
            }
        }
        // if we're here, we got the right spell and are rescued
        this._getRescued();
    }

    _getRescued() {
        // give a new spell card to the Elder
        // animate rescue
        console.log("Goober rescued");
        this.vulnerable = false;
        this.moving = false;
        let rescueTween = game.add.tween(this).to({ y: this.y - 150, alpha: 0}, 800, Phaser.Easing.Linear.InOut);
        rescueTween.onComplete.add(this.kill, this);
        rescueTween.start();
        this.message.destroy();
        game.numRescued++;
        game.rsignal.dispatch("rescued", this);
    }

    die() {
        this.vulnerable = false;
        this.moving = false;
        let deathTween = game.add.tween(this).to({alpha: 0}, 500, "Linear");
        deathTween.onComplete.add(() => {
            this.kill();
            this.message.destroy();
            game.numDead++;
        });
        deathTween.start();
    }
}