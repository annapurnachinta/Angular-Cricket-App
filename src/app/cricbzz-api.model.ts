export class CricbzzApi{
    constructor(public date: Date,
                     public team_1: string,
                     public team_2: string,
                     public matchStarted: boolean,
                     public type: string,
                     public winner_team:string
                        ){}
}
