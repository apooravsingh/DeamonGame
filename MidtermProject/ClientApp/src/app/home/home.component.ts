import { Component, OnInit } from '@angular/core';
import { DiceService } from '../services/diceService';
import { Console } from '@angular/core/src/console';

@Component({
  selector: 'app-home',
    templateUrl: './home.component.html',
      styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit{
  public diceNum: string;

  constructor(private diceService: DiceService) { }

  ngOnInit() {
    var scores = [0, 0];
    var activePlayer = 0;
    var roundScore = 0;

    // document.querySelector("#current-" + activePlayer).textContent = dice;
    //$(".dice").css("display","none");
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.add("active");
  }

  roll() {
    this.diceService.roll().subscribe(res => {
      console.log(res);
      this.diceNum = res;
    });
  }
}
