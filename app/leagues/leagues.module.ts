import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LeagueRoutingModule } from './leagues-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



//Components declarations

import { LeagueListComponent } from './component/league-list/league-list.component';
import { LeagueDetailComponent } from './component/league-detail/league-detail.component';
import { LeagueDataComponent } from './component/league-data/league-data.component'


@NgModule({
    imports: [ SharedModule, LeagueRoutingModule, ReactiveFormsModule, FormsModule ],
    declarations: [ LeagueListComponent, LeagueDetailComponent ,LeagueDataComponent],
    exports: [ ]
})

export class LeagueModule { 

}