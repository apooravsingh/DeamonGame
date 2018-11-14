import { Component, OnInit } from '@angular/core';
import { DiceService } from '../services/diceService';
import { Console } from '@angular/core/src/console';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
    // document.querySelector("#current-" + activePlayer).textContent = dice;
    $(".dice").css("display", "none");
    $(".player-0-panel").removeClass("active");
    $(".player-1-panel").removeClass("active");
    $(".player-0-panel").removeClass("winner");
    $(".player-1-panel").removeClass("winner");
    $(".player-0-panel").addClass("active");
  }

  roll() {
    this.diceService.roll().subscribe(res => {
      this.diceNum = res;
      if (this.diceNum !== 1) {
        //Add score
        this.roundScore += this.diceNum;
        $("#current-" + this.activePlayer).text(this.roundScore);
        $(".dice").css("display", "inline");
      } else {
        // Next player
        this.devilPlay();
      }
    });
  }

  devilPlay() {
    //Next player with ternary operator
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
        if (num !== 1) {
          //Add score
          this.diceNum = num;
          this.roundScore += this.diceNum;
          setTimeout(() => {
              $("#current-1").text(this.roundScore);
              $(".dice").css("display", "inline");
            }, 1000*i);
          // $("#current-1").text(this.roundScore);
          // $(".dice").css("display", "inline");
        } else {
          // Next player
          this.playerPlay();
          return;
        }
      }
      this.scores[1] += this.roundScore;
      $("#score-1").text(this.scores[1]);
      if (this.scores[1] >= 100) {
        $("#name-1").text("Winner!");
        $(".dice").css("display", "none");
        $(".player-1-panel").addClass("winner");
        $(".player-1-panel").removeClass("active");
        this.gamePlaying = false;
      } else {
        this.playerPlay()
      }
    });
  }

  playerPlay() {
    //Next player with ternary operator
    this.activePlayer = 0;
    this.roundScore = 0;
    $("#current-0").text("0");
    $("#current-1").text("0");
    $(".player-0-panel").toggleClass("active");
    $(".player-1-panel").toggleClass("active");
    $(".dice").css("display", "none");
  }

  hold() {
    if (this.gamePlaying && this.activePlayer == 0) {
      // Add currentScore to globalScore
      this.scores[this.activePlayer] += this.roundScore;

      // Update the UI to show the globalScore
      $("#score-" + this.activePlayer).text(this.scores[this.activePlayer]);

      // Check if player won the game
      if (this.scores[this.activePlayer] >= 100) {
        $("#name-" + this.activePlayer).text("Winner!");
        $(".dice").css("display", "none");
        $(".player-" + this.activePlayer + "-panel").addClass("winner");
        $(".player-" + this.activePlayer + "-panel").removeClass("active");
        this.gamePlaying = false;
      } else {
        this.devilPlay()
      }
    }
  }

}
