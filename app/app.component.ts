import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: '<div class="container"><router-outlet></router-outlet></div>',
    styles:[`.container{
        padding:5rem;
    }`]
})
export class AppComponent { }