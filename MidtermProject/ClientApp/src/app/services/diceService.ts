import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class DiceService {
  constructor(private http: Http) { }

  roll() {
    return this.http.get("http://localhost:5000/api/Dice/Roll").map(res => res.json());
  }

  devilRoll(){
    return this.http.get("http://localhost:5000/api/Dice/DevilRoll").map(res => res.json());
  }
}
