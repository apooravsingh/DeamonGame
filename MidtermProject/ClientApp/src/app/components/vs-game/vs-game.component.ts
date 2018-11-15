import { Component, OnInit } from '@angular/core';
import { DiceService } from '../../services/diceService';

@Component({
  selector: 'app-vs-game',
  templateUrl: './vs-game.component.html',
  styleUrls: ['./vs-game.component.css']
})
export class VsGameComponent implements OnInit {
  public diceNum: number;
  public scores: number[];
  public activePlayer: number;
  public roundScore: number;
  public gamePlaying: boolean = true;

  constructor(private diceService: DiceService) { }

  ngOnInit() {
    this.scores = [0, 0];
    this.activePlayer = 0;
    this.roundScore = 0;
    $(".dice").css("display", "none");
    $(".player-0-panel").removeClass("active");
    $(".player-1-panel").removeClass("active");
    $(".player-0-panel").removeClass("winner");
    $(".player-1-panel").removeClass("winner");
    $(".player-0-panel").addClass("active");
  }

  roll() {
    if (this.gamePlaying) {
      this.diceService.roll().subscribe(res => {
        this.diceNum = res;
        $(".dice").css("display", "inline");
        if (this.diceNum !== 1) {
          //Add score
          this.roundScore += this.diceNum;
          $("#current-" + this.activePlayer).text(this.roundScore);
        } else {
          // Next player
          $(".playerDice").empty();
          this.nextPlayer();
        }
      });
    }
  }

  hold(){
    if(this.gamePlaying){
      // Add currentScore to globalScore
      this.scores[this.activePlayer] += this.roundScore;

      // Update the UI to show the globalScore
     $("#score-" + this.activePlayer).text(this.scores[this.activePlayer]);

      // Check if player won the game
      if(this.scores[this.activePlayer] >= 100){
        $("#name-" + this.activePlayer).text("Winner!");
          $(".dice").css("display","none");
          $(".player-" + this.activePlayer + "-panel").addClass("winner");
          $(".player-" + this.activePlayer + "-panel").addClass("active");
          this.gamePlaying = false;
      } else {
        this.nextPlayer()
      }
  }
  }

  nextPlayer() {
    //Next player with ternary operator
    this.activePlayer === 0 ? this.activePlayer = 1 : this.activePlayer = 0;
    this.roundScore = 0;

    $("#current-0").text("0");
    $("#current-1").text("0");
    $(".player-0-panel").toggleClass("active");
    $(".player-1-panel").toggleClass("active");
    $(".dice").css("display", "none");
  }

  showInfo() {
    $(".modal").addClass("show");
  }

  close() {
    $(".modal").removeClass("show");
  }
}
