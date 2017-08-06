"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var league_list_component_1 = require("../league-list/league-list.component");
var league_service_1 = require('../../service/league.service');
var LeagueDataComponent = (function () {
    function LeagueDataComponent(leaguelist, _service, route) {
        this.leaguelist = leaguelist;
        this._service = _service;
        this.route = route;
        this.LeagueData = [];
    }
    LeagueDataComponent.prototype.ngOnInit = function () {
        var leagueName = this.route.snapshot.params['name'];
        this.name = leagueName;
        var leagueDesc = this.route.snapshot.params['description'];
        this.description = leagueDesc;
        var leagueBanner = this.route.snapshot.params['banner'];
        this.banner = leagueBanner;
        var leagueGender = this.route.snapshot.params['preferredGender'];
        this.preferredGender = leagueGender;
        var leagueAgegroup = this.route.snapshot.params['preferredAgeGroup'];
        this.preferredAgeGroup = leagueAgegroup;
        var leagueLanguage = this.route.snapshot.params['preferredLanguage'];
        this.preferredLanguage = leagueLanguage;
    };
    LeagueDataComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'league-data',
            templateUrl: 'league-data.component.html',
            providers: [league_service_1.LeagueService, league_list_component_1.LeagueListComponent]
        }), 
        __metadata('design:paramtypes', [league_list_component_1.LeagueListComponent, league_service_1.LeagueService, router_1.ActivatedRoute])
    ], LeagueDataComponent);
    return LeagueDataComponent;
}());
exports.LeagueDataComponent = LeagueDataComponent;
//# sourceMappingURL=league-data.component.js.map