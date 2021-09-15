const players1 : any[] = [
    {points: "24", playerId: "468", name: "Dario Saric"},
    {points: "24", playerId: "159", name: "Joel Embiid"},
    {rebounds: "16", playerId: "159", name: "Joel Embiid"},
    {assists: "8", playerId: "481", name: "Ben Simmons"}
    ]
    
    const players2 : any[] = [
    {points: "22", playerId: "546", name: "Hassan Whiteside"},
    {rebounds: "14", playerId: "546", name: "Hassan Whiteside"},
    {assists: "6", playerId: "404", name: "Kelly Olynyk"}
    ]
    
    
    const getTeamStats = function(players1 : any[]) : any[]{
        let players2: any[] = []
    
        const isIn = function(player1: { playerId: any }, players2: any[]) : boolean{
            
            let inArray : boolean = false 
            
            players2.forEach((player2) => {
                if (player2.playerId == player1.playerId) {
                    inArray = true
                }
            })
            return inArray 
        }
    
        players1.forEach((player1) => {
            if(!isIn(player1, players2)){
                //console.log(isIn(player1, players2))
                players2.push({playerId: player1.playerId, name: player1.name})
            }
        })
    
        players1.forEach((player1) => {
            players2.forEach((player2) =>{
                if(player1.playerId == player2.playerId){
                    let first1 : string = Object.keys(player1)[0]
                    player2[first1] = player1[first1]
                }
            })
        })
    
        players2.forEach((player) =>{
            delete player.playerId
            //console.log(player)
        })
    
        return players2
    }
    
    console.log(getTeamStats(players1))
    console.log(getTeamStats(players2))