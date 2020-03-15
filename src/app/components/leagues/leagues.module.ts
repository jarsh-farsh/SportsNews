import { NgModule } from "@angular/core";
import { LeaguesComponent } from './leagues.component';
import { LeaguesRoutingModule } from './leagues-routing.module';
import { PromoComponent } from './promo.component';


@NgModule({
    declarations:[
        LeaguesComponent,
        PromoComponent
    ],
    imports: [
        LeaguesRoutingModule
    ],
    exports: []
})
export class LeaguesModule { }