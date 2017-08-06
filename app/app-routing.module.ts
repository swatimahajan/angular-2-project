import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forRoot([
             {path: '', redirectTo: 'leagues', pathMatch: 'full'},
             {path: '**', redirectTo: 'leagues'},
             {path:'leaguedata', redirectTo:'leaguedata'}
             
        ])
    ],
    declarations: [],
    exports: [RouterModule]
})

export class AppRoutingModule {

}