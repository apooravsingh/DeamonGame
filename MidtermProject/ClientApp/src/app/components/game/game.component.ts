import { Component, OnInit } from '@angular/core';
import { DiceService } from '../../services/diceService';
import { Console } from '@angular/core/src/console';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
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
    $(".player-0-panel").removeClass("active");
    $(".player-1-panel").removeClass("active");
    $(".player-0-panel").removeClass("winner");
    $(".player-1-panel").removeClass("winner");
    $(".player-0-panel").addClass("active");
  }

  roll() {
    $(".devilDices").empty();
    $(".playerDice").empty();
    this.diceService.roll().subscribe(res => {
      this.diceNum = res;
      // $(".dice").css("display", "inline");
      $(".playerDice").append('<img src="https://javpet.github.io/The-Pig-Game/dice-' + this.diceNum + '.png" width="50px" height="50px" style="box-shadow: 0px 10px 60px rgba(0, 0, 0, 0.10);">');
      if (this.diceNum !== 1) {
        //Add score
        this.roundScore += this.diceNum;
        $("#current-" + this.activePlayer).text(this.roundScore);
      } else {
        // Next player
        $(".playerDice").empty();    
        alert("You rolled 1, devil's turn now.");
        this.devilPlay();
      }
    });
  }

  devilPlay() {
    //Next player with ternary operator
    // $(".playerDice").empty();
    this.activePlayer == 1;
    this.roundScore = 0;
    $("#current-0").text("0");
    $("#current-1").text("0");
    $(".player-0-panel").toggleClass("active");
    $(".player-1-panel").toggleClass("active");
    $(".dice").css("display", "none");
    let devilDices: number[];
    this.diceService.devilRoll().subscribe(res => {
      devilDices = res;
      console.log(devilDices);
      for (let i = 0; i < devilDices.length; i++) {
        let num = devilDices[i];
        $(".devilDices").append('<img src="https://javpet.github.io/The-Pig-Game/dice-' + num + '.png" width="50px" height="50px" style="box-shadow: 0px 10px 60px rgba(0, 0, 0, 0.10);">&nbsp;');
        if (num !== 1) {
          //Add score
          this.diceNum = num;
          this.roundScore += this.diceNum;
        } else {
          // Next player
          setTimeout(() => {
            alert("Devil rolled 1, your turn now.");
          }, 100);
          this.playerPlay();
          return;
        }
      }
      this.scores[1] += this.roundScore;
      $("#score-1").text(this.scores[1]);
      if (this.scores[1] >= 100) {
        $("#name-1").text("Devil win!");
        $(".dice").css("display", "none");
        $(".player-1-panel").addClass("winner");
        $(".player-1-panel").removeClass("active");
        this.gamePlaying = false;
      } else {
        this.playerPlay();
      }
    });
  }

  playerPlay() {
    //Next player with ternary operator
    $(".playerDice").empty();
    $(".playerDice").append("<h2>Your turn now.</h2>");
    this.activePlayer = 0;
    this.roundScore = 0;
    $("#current-0").text("0");
    $("#current-1").text("0");
    $(".player-0-panel").toggleClass("active");
    $(".player-1-panel").toggleClass("active");
    $(".dice").css("display", "none");
  }

  hold() {
    $(".devilDices").empty();
    if (this.gamePlaying && this.activePlayer == 0) {
      // Add currentScore to globalScore
      this.scores[0] += this.roundScore;
      // Update the UI to show the globalScore
      $("#score-0").text(this.scores[this.activePlayer]);
      // Check if player won the game
      if (this.scores[0] >= 100) {
        $("#name-" + this.activePlayer).text("You win!");
        $(".dice").css("display", "none");
        $(".player-0-panel").addClass("winner");
        $(".player-0-panel").removeClass("active");
        this.gamePlaying = false;
      } else {
        this.devilPlay()
      }
    }
  }

  showInfo(){
    $(".modal").addClass("show");
  }

  close(){
     $(".modal").removeClass("show");
  }
}
