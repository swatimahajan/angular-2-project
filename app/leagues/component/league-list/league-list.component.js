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
var league_service_1 = require('../../service/league.service');
var LeagueListComponent = (function () {
    // public hideButton: boolean=false;
    function LeagueListComponent(_service, route) {
        this._service = _service;
        this.route = route;
        this.modal = {
            "header": "MODAL HEADER",
            "text": "MODAL TEXT"
        };
        this.LeagueData = [];
    }
    LeagueListComponent.prototype.ngOnInit = function () {
        this.getAllLeagues();
    };
    LeagueListComponent.prototype.getAllLeagues = function () {
        var _this = this;
        this._service.getAllLeagues()
            .subscribe(function (leagues) {
            return _this.LeagueData = leagues;
        }, function (err) { return console.error(err); });
    };
    // Redirecting league data on modal 
    LeagueListComponent.prototype.redirect = function (data) {
        data.preferredAgeGroup = JSON.stringify(data.preferredAgeGroup);
        data.preferredLanguage = JSON.stringify(data.preferredLanguage);
        data.preferredGender = JSON.stringify(data.preferredGender);
        this.route.navigate(['./leaguedetail', data]);
        console.log("redirected data is :", data);
    };
    LeagueListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'league-list',
            templateUrl: 'league-list.component.html',
            styleUrls: ['league-list.component.css'],
            // providers:[LeagueDetailComponent],
            outputs: ["LeagueData"]
        }), 
        __metadata('design:paramtypes', [league_service_1.LeagueService, router_1.Router])
    ], LeagueListComponent);
    return LeagueListComponent;
}());
exports.LeagueListComponent = LeagueListComponent;
//# sourceMappingURL=league-list.component.js.map