import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesService } from 'src/app/services/games.service';
import { Game } from 'src/app/model/game';
import { NgbCalendar, NgbDateStruct, NgbDate, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-games-details',
  templateUrl: './games-details.component.html',
  styleUrls: ['./games-details.component.css']
})
export class GamesDetailsComponent implements OnInit {

  //model podataka za vakcinacije koja treba da se prikaže na formi
  game: Game = new Game();
  //Napravljeno je polje modela forme
  gameForm: FormGroup;

  categories: string[] = [];
  
  day: NgbDateStruct = { day: 0, month: 0, year: 0 };
  hour: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']


  constructor(private fb: FormBuilder, private service: GamesService, private router: Router,
    private route: ActivatedRoute,private calendar: NgbCalendar) {
    this.gameForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(50)]],
      publish_date: ['', Validators.required],
      categories: ['', [Validators.required]]
    });
  }
     

  ngOnInit() {

    //moramo u on init zbog edita, da dobijemo i NIZ SVIH KATEGORIJA.
    this.service.getCategories().subscribe(data => {
      this.categories = data; 
    });

    //gameResult, napraviti objekat modela Game, get se odnosi iz servisa na get sa IDjem.
    let id: number = Number(this.route.snapshot.params["id"]);
    if (id) {
      this.service.getOneGame(Number(id)).subscribe(data => {
        this.game = data;
        let date = new Date(this.game.publish_date); // ime objekta, i njenofov ng modela u formi.
        this.gameForm.patchValue(this.game);//uhvati vrednost objekta
        this.gameForm.controls['publish_date'].setValue({
          year: date.getFullYear(),
          month: date.getMonth(),
          day: date.getDate()
        })
      });
    }

  }


  onSubmit() {
   
     //hvatamo vrednost iz forme
    let id: number = Number(this.route.snapshot.params['id']);

    let ngbDate = this.gameForm.controls['publish_date'].value;
    let myDate = new Date(ngbDate.year, ngbDate.month, ngbDate.day).toISOString();
    this.game.publish_date = String(myDate);
    if (id) {
      this.game._id = id;
      this.service.update(this.game).subscribe({
        next: (response: any) => {
          alert('Updated succsessfully')
          this.router.navigate(['/games']);
        }
      });
    } else {
      this.service.add(this.game).subscribe({
        next: (response: any) => {
          alert('Added succsessfully!')
          this.router.navigate(['/games']);
        }
      });
    }


  }

}
