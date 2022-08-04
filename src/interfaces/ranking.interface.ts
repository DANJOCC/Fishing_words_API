export interface UserRanking{
    username:string,
    victories:{
        sixLetters: number,
        fiveLetters: number,
        fourLetters: number,
    }
    gamesWon:number
    gamesPlayed:number
}