class GameUI extends Phaser.Group {
    constructor(x, y) {
        super(game);
        this.x = x;
        this.y = y;

        this.buttonPanel = this.add(new ButtonPanel(0, 538));
        this.scoreboard = this.add(new ScoreBoard(0, 0));
    }

}