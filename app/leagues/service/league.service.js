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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/observable/throw');
require('rxjs/add/operator/toPromise');
var router_1 = require('@angular/router');
// import { LeagueListComponent } from "../component/league-list/league-list.component";
var constant_1 = require('../constant/constant');
var LeagueService = (function () {
    function LeagueService(jsonp, http, router) {
        this.jsonp = jsonp;
        this.http = http;
        this.router = router;
    }
    LeagueService.prototype.getAllLeagues = function () {
        var url = constant_1.JHAKAAS_ROOT + "leagues";
        return this.http.get(url)
            .map(function (leagues) { return leagues.json(); })
            .catch(function (err) {
            console.error("Unable to get leagues - " + err);
            return Observable_1.Observable.throw(err.json());
        });
    };
    LeagueService.prototype.addLeague = function (body) {
        var url = constant_1.JHAKAAS_ROOT + "leagues";
        var bodyString = JSON.stringify(body); // Stringify payload
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(url, bodyString, options)
            .map(function (res) { return res.json(); })
            .catch(function (err) { return Observable_1.Observable.throw(err.json() || 'Server Error'); });
    };
    LeagueService.prototype.updateBanner = function (leagueId, fileList) {
        var url = constant_1.JHAKAAS_ROOT + "leagues/" + leagueId + "/banner";
        // if (fileList) {
        // let file: File = fileList[0];
        if (fileList) {
            var file = fileList[0];
            console.log('file is', file);
            var headers = new http_1.Headers();
            headers.append('Content-Type', "multipart/form-data");
            //headers.append('Accept', 'application/json');
            var options = new http_1.RequestOptions({ headers: headers });
            console.log("headers - ", headers);
            return this.http.put(url, file, options)
                .map(function (res) { return res.json(); })
                .catch(function (err) { return Observable_1.Observable.throw(err); });
        }
    };
    LeagueService.prototype.reload = function () {
        // location.reload();
        this.router.navigate(['./leagues']);
    };
    // edit and save league with same id
    LeagueService.prototype.updateLeague = function (data, id) {
        var _this = this;
        console.log("id inside srvie method", id);
        console.log(" data inside service ts is: ", data);
        var url = constant_1.JHAKAAS_ROOT + "leagues/" + id;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this.http.put(url, JSON.stringify(data), { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (success) {
            _this.reload();
            console.log("Success is : ", success);
        }, function (err) {
            _this.reload();
            console.log("Error is : ", err);
        });
    };
    // delete League
    LeagueService.prototype.deleteLeague = function (id) {
        console.log("league id is", id);
        var url = "delete_api" + id; // @TODO insert api to delete league
        return this.http.delete(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) {
            return Observable_1.Observable.throw(error.json().error || 'Server error');
        });
    };
    LeagueService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Jsonp, http_1.Http, router_1.Router])
    ], LeagueService);
    return LeagueService;
}());
exports.LeagueService = LeagueService;
//# sourceMappingURL=league.service.js.map