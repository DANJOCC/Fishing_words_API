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

    public async updateRanking(username: string, newVictorie: boolean, mode:string){
        const ranker= await userRanking.findOne({username})
        
        if(ranker===null){
            return false
        }
        if(newVictorie && mode!==undefined){
            if(mode==='fourLetters'){
                ranker.victories['fourLetters']++}
            if(mode==='fiveLetters'){
                ranker.victories['fiveLetters']++}
            if(mode==='sixLetters'){
                ranker.victories['fiveLetters']++}
            ranker.gamesWon++
            
        }
        ranker.gamesPlayed++
        ranker.save()
        return true

    }
}

export const rankingBoard=new RankingBoard()