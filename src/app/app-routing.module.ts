import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRanksComponent } from './user-ranks/user-ranks.component';

const routes: Routes = [
  {path: '**', component: UserRanksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
