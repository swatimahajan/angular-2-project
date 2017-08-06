import { Component, OnInit,Input } from '@angular/core';
import {EventEmitter } from '@angular/core';
import { Router} from '@angular/router';
import { LeagueService } from '../../service/league.service';

import { League } from '../../model/league';
import { JHAKAAS_ROOT } from '../../constant/constant';
import { LeagueDetailComponent } from "../league-detail/league-detail.component";

@Component({
    moduleId: module.id,
    selector: 'league-list',
    templateUrl: 'league-list.component.html',
    styleUrls: ['league-list.component.css'],
    // providers:[LeagueDetailComponent],
    outputs:[`LeagueData`]
})

export class LeagueListComponent implements OnInit {
public modal = {
    "header":"MODAL HEADER",
    "text" : "MODAL TEXT"
   };
    public LeagueData : League[] = [] ;
    public trnsfrdata: any;
    // public hideButton: boolean=false;

    constructor(
        private _service: LeagueService,
        private route: Router,
        // public leaguedetail :LeagueDetailComponent
                ) { }

    ngOnInit() {
        this.getAllLeagues();
    }

    getAllLeagues() {
        this._service.getAllLeagues()
            .subscribe(leagues => {
                 return this.LeagueData = leagues;
            },
         
            err => console.error(err));
    }

    // Redirecting league data on modal 

    redirect(data){
        data.preferredAgeGroup = JSON.stringify(data.preferredAgeGroup);
        data.preferredLanguage = JSON.stringify(data.preferredLanguage);
        data.preferredGender = JSON.stringify(data.preferredGender);
        this.route.navigate(['./leaguedetail',data]);
        console.log("redirected data is :", data);
     } 
    // hide(){
    //     this.leaguedetail.hideButton = true;
    // }
    
}

