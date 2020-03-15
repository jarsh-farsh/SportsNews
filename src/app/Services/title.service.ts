import { Injectable } from "@angular/core";
import { Subscription } from 'rxjs';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class TitleService{

    onPageChange: Subscription;

    get pageTitle(): string {
        return this.title.getTitle();
    }
    set pageTitle(title: string){
        this.title.setTitle(title);
    }

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private title: Title)
    {
        //When a new page is loaded, the title is loaded into the title service
        this.onPageChange = router.events.subscribe((val) => {
            if(val instanceof NavigationEnd){
                const child = this.activatedRoute.firstChild;
                if(child.snapshot.data['title']){
                    this.pageTitle = child.snapshot.data['title'];
                }
            }
        })
    }

}