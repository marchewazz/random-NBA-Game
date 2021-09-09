import { Component, OnInit } from '@angular/core';
import { GameDataService } from 'src/app/services/game-data.service';

@Component({
  selector: 'app-game-data',
  templateUrl: './game-data.component.html',
  styleUrls: ['./game-data.component.scss']
})
export class GameDataComponent implements OnInit {

  public gameData : any;
  public homeTeam : any;
  public awayTeam : any;

  constructor(private gds: GameDataService) {}

  ngOnInit(): void {
    do{
      this.gds.getGame().subscribe((res) => {
        this.gameData = res['api']['game'][0];
        this.homeTeam = this.gameData['hTeam'];
        this.awayTeam = this.gameData['vTeam'];
        console.log(this.gameData);
        console.log(this.homeTeam);
        console.log(this.awayTeam);
        }
      );
    } while(this.gameData['league'] != "standard" || this.gameData['statusGame'] != "Finished")
  }
}
