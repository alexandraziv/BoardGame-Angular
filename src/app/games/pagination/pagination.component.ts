import { GameList } from './../../model/gameList';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GamesService } from 'src/app/services/games.service';
import { Game } from 'src/app/model/game';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() list: Game[] = [];
  @Input()
  page: number = 1;

  @Input()
  pageSize: number = 5;

  @Input()
  collectionSize: number = 0;

  @Output()
  pageChange: EventEmitter<number> = new EventEmitter();

  pages: number[] = [];

  constructor() {}

  ngOnInit(): void { }
  
  ngOnChanges(): void {
    this.pages = [];
    const numOfPages = Math.ceil(this.collectionSize / this.pageSize);
    let currentPage = 1;
    while (currentPage <= numOfPages) {
      this.pages.push(currentPage);
      currentPage += 1;
    }
  }

  onPageChanged(newPage: number) {
    this.pageChange.emit(newPage);
  }
}
