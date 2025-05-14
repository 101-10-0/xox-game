export class Scoreboard {
    constructor() {
        this.scoreX = 0;
        this.scoreO = 0;
        this.ties = 0;
    }

    updateScore(player) {
        if (player === 'X') {
            this.scoreX++;
            document.getElementById('scoreX').textContent = this.scoreX;
        } else {
            this.scoreO++;
            document.getElementById('scoreO').textContent = this.scoreO;
        }
    }

    updateTies() {
        this.ties++;
        document.getElementById('scoreTie').textContent = this.ties;
    }
}