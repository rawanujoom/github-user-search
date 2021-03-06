import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: '/home'},
	{ path: 'home', component:  HomeComponent },
	// { path: 'dragon/:id', component:  DragonComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
