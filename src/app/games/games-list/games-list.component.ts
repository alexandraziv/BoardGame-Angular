import { Component, OnInit } from '@angular/core';
import { GamesService } from 'src/app/services/games.service';
import { Game } from 'src/app/model/game';
import { GameList } from 'src/app/model/gameList';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {

  games: Game[] = [];

  //getCount za paginaciju
  gameCount: GameList = new GameList();


  //sve kategorije koje postoje za selekt.
  categories: string[] = [];


  params: any = {
    page: 1,
    pageSize: 6,
    filter: {
      categories: '',
      minRating: '',
      maxRating: ''

    }
  }
  constructor(private service: GamesService) { }

  ngOnInit() {
    this.getGames()
    this.updateCategories()
    // this.loadMore()
    this.getCount()

  }

  //UPDATE FROM SERVIS, NOVI NIZ
  getGames() {
    this.service.getAllGames(this.params).subscribe({
      next: response => {
        this.games = response.games;
      }
    })
  }
  //moramo ovde za paginaciju, inace nece hteti iznad da pozove brojac iz liste 
  getCount() {
    this.service.getAllGames(this.params).subscribe((x: GameList) => {
      this.gameCount = x;
    })
  }

  //pozovi kategorije iz servisa
  updateCategories() {
    this.service.getCategories().subscribe(result => {
      this.categories = result;
    })
  }

  onSortCriteriaChanged(criteria: string): void {
    if (this.params.sort == criteria) {
      this.params.sortDirection = (this.params.sortDirection == "asc") ? "desc" : "asc";
    } else {
      this.params.sort = criteria;
      this.params.sortDirection = "asc";
    }
    this.getGames();
  }

  onGamesDeleted(id: number): void {
    this.service.remove(id).subscribe({
      next: (data: Game) => {
        this.getGames()
      }
    });
  }


  filterByMin(data: any) {
    this.params.filter.minRating = data.value;
    this.params.page = 1;
  }
  filterByMax(data: any) {
    this.params.filter.maxRating = data.value;
    this.params.page = 1;
  }

  selectCategory(item: any) {
    this.params.filter.categories = item.value;
    this.params.page = 1;
    console.log(item.value)
  }

  changePage(newPage: number): void {
    this.params.page = newPage;
    this.getCount()
  }

  onPageChanged(newPage: number) {
    this.params.pageSize = newPage;
    this.getGames();
    let pageCount = this.gameCount.count;
    if (pageCount <= this.params.pageSize) {
      this.params.pageSize = 5;
      this.getGames();
    }


    /*loadMore() {
      if ((this.service.gamesCount - this.params.pageSize * this.params.page) > 0) {
        this.params.page++;
      } else {
        this.params.page = 1;
  
      }
      this.getGames();
    }*/




  }
}
