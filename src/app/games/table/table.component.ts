import { GameList } from './../../model/gameList';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GamesService } from 'src/app/services/games.service';
import { Game } from 'src/app/model/game';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  //ng for u tabeli i zatim u app table [game]= games je iz glavnot ts niz.
  @Input() game: Game[] = []; 

  @Output() gameDeleted: EventEmitter<number> = new EventEmitter();
  @Output() sortCriteriaChanged: EventEmitter<any> = new EventEmitter();

  constructor(private service: GamesService) { }

  ngOnInit(): void {
    this.getGames()
  }

  //ista funkcija kao u glavnom ts za dobavljanje svih sa servera
  //PRAVIMO OBJEKAT IZ MODELA PODATAKA
  
  getGames() {
    this.service.getAllGames().subscribe({
      next: response => {
        this.game = response.games;
      }
    })
  }
  onDelete(id: number) {
    this.gameDeleted.emit(id);
    this.getGames()
    
  };
  
  onSortCriteriaChanged(value: string): void {
    this.sortCriteriaChanged.emit(value);
    this.getGames()
   
  }
  

}
