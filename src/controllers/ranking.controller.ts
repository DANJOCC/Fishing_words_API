import { UserRanking } from "../interfaces/ranking.interface";
import { userRanking } from "../models/ranking.model";

class RankingBoard{

    public async newRanker(ranking:UserRanking){
        const username=ranking.username
        const ranker= await userRanking.findOne({username})
        
        if(ranker!==null){
            return false
        }
        else{
            const ranker=await new userRanking({
                username,
                victories:ranking.victories,
                gamesWon:ranking.gamesWon,
                gamesPlayed:ranking.gamesPlayed
            })
            return true
        }
    }

    public async updateRanking(username: string, newVictorie: number, letters:number, rounds:number){
        const ranker= await userRanking.findOne({username})
        
        if(ranker===null){
            return false
        }
        if(letters!==undefined){
            if(letters===4){
                ranker.victories['fourLetters']+=newVictorie}
            if(letters ===5 ){
                ranker.victories['fiveLetters']+=newVictorie}
            if(letters===6){
                ranker.victories['fiveLetters']+=newVictorie}
            ranker.gamesWon+=newVictorie
            
        }
        ranker.gamesPlayed+=rounds
        ranker.save()
        return true

    }
}

export const rankingBoard=new RankingBoard()