import { AboutComponent } from './core/about/about.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesListComponent } from './games/games-list/games-list.component';
import { GamesDetailsComponent } from './games/games-details/games-details.component';

const routes: Routes = [
  { path: 'home', component: AboutComponent },
  { path: 'games', component: GamesListComponent },
  { path: 'games/new', component: GamesDetailsComponent },
  { path: 'games/:id/details', component: GamesDetailsComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
