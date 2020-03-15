import { Component, OnInit } from '@angular/core';
import { WindowService } from './Services/window.service';
import { Router, NavigationEnd } from '@angular/router';
import { TitleService } from './Services/title.service';
import { RouteService } from './Services/router.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dodgeball Thing';

  get inputDisabled(): boolean {
    return this.windowService.inputDisabled;
  }

  constructor(private windowService: WindowService,
              private titleService: TitleService,
              private routeService: RouteService,
              private router: Router){

  }

  ngOnInit(){

    this.routeService.loadRoutes();

    this.router.events.subscribe((event) => {
      if((event instanceof NavigationEnd)){
        window.scrollTo(0,0);
      }
      
    })

    
  }
}
