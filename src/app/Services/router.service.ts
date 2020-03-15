import { Injectable } from "@angular/core";
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Url } from 'url';

@Injectable({
    providedIn: 'root'
})
export class RouteService{

    private previousUrl: string;
    private currentUrl: string;

    constructor(private router: Router){ }

    loadRoutes(){
        this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(({urlAfterRedirects}: NavigationEnd) => {
            this.previousUrl = this.currentUrl;
            this.currentUrl = urlAfterRedirects;
        })
    }

    getPreviousRoute(){
        return this.previousUrl;
    }

    getCurrentRoute(){
        return this.currentUrl;
    }
}