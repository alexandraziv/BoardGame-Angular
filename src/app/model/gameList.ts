import { Game } from "./game";

export class GameList{

    //JSON PODACI SA SERVERA . results i count.
    //obrati paznju na server, niz se zove donors. 
    count: number;
    games: Game[];
    

    // pomocu map/operators  konvertujemo JS niz iz JSON-a i vracamo objekat po objekat sa servera.
    constructor(obj?:any) {
        this.games= obj && obj.games.map((elem:any) => { return new Game(elem)}) || [];
        this.count = obj && obj.count || 0;
    }
}