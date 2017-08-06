import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JsonpModule, HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BugModule } from './bugs/bugs.module';
import { AppRoutingModule} from './app-routing.module';
import { CoreModule } from './core/core.module';
import { LeagueModule } from './leagues/leagues.module';
import { LeagueService } from '../app/leagues/service/league.service';



import { AppComponent } from './app.component';

@NgModule({
    imports: [BrowserModule,
        BugModule,
        LeagueModule,
        HttpModule,
        AppRoutingModule,
        CoreModule.forRoot(),
        JsonpModule,
        ReactiveFormsModule,
        
    ],
    providers: [LeagueService,],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})

export class AppModule { }