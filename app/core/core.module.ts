import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';

@NgModule({
    imports: [ ],
    declarations: [ ],
    exports: [ ]
})

export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule : CoreModule ) {
        if (parentModule) { 
            throw new Error( "Core Module already exist, only import in the root/app module" );
        }
    }
    static forRoot() : ModuleWithProviders {
            return{
                ngModule: CoreModule,
                providers: [ ]
            }
        }

}