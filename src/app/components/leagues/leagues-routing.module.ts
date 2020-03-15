import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { LeaguesComponent } from './leagues.component';
import { PromoComponent } from './promo.component';

const routes = [
    { path: 'leagues', component: LeaguesComponent, data: { title: 'Leagues' } },
    { path: 'promo', component: PromoComponent, data: {title: 'Promote Your Event'}}
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class LeaguesRoutingModule { }