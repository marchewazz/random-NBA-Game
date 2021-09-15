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
  public homePlayersStats : any;
  public awayPlayersStats : any;

  private getPlayersStats = function(playersStats : any[]) : any[] {
    /*
      API returns players stats as array of objects but some players have multiple stats 
      ex. {stat1: string, playerId : x},
      ex. {stat2: string, playerId : x}.
      This function returns array of objects but as {stat1: string, stat2: string, platerId: x}
    */
    let modifiedPlayersStats: any[] = []
    
    // check if player is already in modifiedPlayersStats array
    const isIn = function(player1: { playerId: any }, players2: any[]) : boolean{
        
        let inArray : boolean = false 
        
        players2.forEach((player2) => {
            if (player2.playerId == player1.playerId) {
                inArray = true
            }
        })
        return inArray 
    }

    // if player is not in array then adds him
    playersStats.forEach((player1) => {
      if(!isIn(player1, modifiedPlayersStats)){
          //console.log(isIn(player1, players2))
          modifiedPlayersStats.push({playerId: player1.playerId, name: player1.name})
      }
    })

    // adds stats to player when gets squal id  
    playersStats.forEach((player1) => {
      modifiedPlayersStats.forEach((player2) =>{
          if(player1.playerId == player2.playerId){
              let first1 : string = Object.keys(player1)[0]
              player2[first1] = player1[first1]
          }
      })
    })

    // deletes unnecessary index
    modifiedPlayersStats.forEach((player) =>{
      delete player.playerId
      //console.log(player)
    })

    return modifiedPlayersStats
  }

  constructor(private gds: GameDataService) {}

  ngOnInit(): void {
    //this gets a game data from API
    this.gds.getGame().subscribe((res) => {
      this.gameData = res['api']['game'][0];
        
      console.log(this.gameData['league']);
      console.log(this.gameData['statusGame']);

      this.homeTeam = this.gameData['hTeam'];
      this.awayTeam = this.gameData['vTeam'];
      
      this.homePlayersStats = this.getPlayersStats(this.homeTeam['leaders']);
      this.awayPlayersStats = this.getPlayersStats(this.awayTeam['leaders']);

      console.log(this.gameData);
      console.log(this.homeTeam);
      console.log(this.awayTeam);
      console.log(this.homePlayersStats[0]);
      });
    }
  }
