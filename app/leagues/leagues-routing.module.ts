import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


//components
import { LeagueListComponent } from './component/league-list/league-list.component';
import { LeagueDataComponent} from './component/league-data/league-data.component';
import { LeagueDetailComponent } from "./component/league-detail/league-detail.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            
            { path: 'leagues', component: LeagueListComponent },
            { path: 'leaguedata',component: LeagueDataComponent},
            { path: 'leaguedetail',component: LeagueDetailComponent}


        ])],
    declarations: [],
    exports: []
})

export class LeagueRoutingModule { }