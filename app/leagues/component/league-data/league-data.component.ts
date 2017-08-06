import { Component ,OnInit} from '@angular/core';
import { FormGroup,FormBuilder, FormControl, FormArray,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { LeagueListComponent } from "../league-list/league-list.component";
import { LeagueService } from '../../service/league.service';
import { League } from '../../model/league';

@Component({
    moduleId: module.id,
    selector: 'league-data',
    templateUrl:'league-data.component.html',
    providers:[LeagueService,LeagueListComponent]
})

export class LeagueDataComponent implements OnInit { 
    public LeagueData : League[] = [] ;
    public leagues: League;
    public name;
    public description;
    public banner;
    public preferredGender;
    public preferredAgeGroup;
    public preferredLanguage;
    

     constructor (private leaguelist:LeagueListComponent,
                  private _service: LeagueService,
                  private route: ActivatedRoute){}

    ngOnInit(){

        let leagueName = this.route.snapshot.params['name'];
        this.name = leagueName;

        let leagueDesc = this.route.snapshot.params['description'];
        this.description = leagueDesc;

        let leagueBanner = this.route.snapshot.params['banner'];
        this.banner = leagueBanner;

        let leagueGender = this.route.snapshot.params['preferredGender'];
        this.preferredGender = leagueGender;

        let leagueAgegroup = this.route.snapshot.params['preferredAgeGroup'];
        this.preferredAgeGroup = leagueAgegroup;

        let leagueLanguage = this.route.snapshot.params['preferredLanguage'];
        this.preferredLanguage = leagueLanguage;
        
        
    }
}
