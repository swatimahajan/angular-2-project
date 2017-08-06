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
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var league_service_1 = require('../../service/league.service');
var league_1 = require('../../model/league');
var league_list_component_1 = require("../league-list/league-list.component");
var LeagueDetailComponent = (function () {
    function LeagueDetailComponent(_service, _leaguelist, http, route, router) {
        this._service = _service;
        this._leaguelist = _leaguelist;
        this.http = http;
        this.route = route;
        this.router = router;
        this.text = " League Detail component ";
        this.LeagueList = [];
        this.LeagueData = [];
        this.modalId = "leagueModal";
        this.prefAgeGroup = [
            { value: 'y', display: '10-20', status: false, min: 10, max: 20 },
            { value: 'O', display: '20-45', status: false, min: 20, max: 45 },
            { value: 'All', display: 'All', status: true, min: 0, max: 0 },
        ];
        this.prefLang = [
            { value: 'en', display: 'English', status: false },
            { value: 'hi', display: 'Hindi', status: false },
            { value: 'All', display: 'All', status: true }
        ];
        this.services = {}; //TODO remove
        this.league = new league_1.League(null, null, null, null, null, null, null, null);
        this.agegrp = {
            isForAll: false,
            range: []
        };
        this.lang = {
            isForAll: false,
            language: []
        };
        this.gender = {
            isForAll: false,
            genders: []
        };
        this.setPrefAge = function (ageArr, prefAge, callback) {
            var _this = this;
            this.agegrp = {
                isForAll: false,
                range: []
            };
            ageArr.forEach(function (element) {
                console.log("element is : ", element);
                prefAge.forEach(function (data) {
                    console.log("age data is : ", data);
                    if (element == data.value) {
                        if (element != "All") {
                            var r = {
                                min: data.min,
                                max: data.max,
                            };
                            _this.agegrp.range.push(r);
                        }
                        else {
                            console.log("For all age : ", _this.agegrp);
                            _this.agegrp.isForAll = true;
                        }
                    }
                });
            });
            callback();
        };
        this.setPrefLang = function (langArr, prefLang, callback) {
            var _this = this;
            this.lang = {
                isForAll: false,
                language: []
            };
            langArr.forEach(function (element) {
                console.log("testing - " + element);
                prefLang.forEach(function (data) {
                    if (element == data.value) {
                        console.log("testing main- " + data.value);
                        if (element != "All") {
                            _this.lang.language.push(data.value);
                        }
                        else {
                            _this.lang.isForAll = true;
                        }
                    }
                });
            });
            callback();
        };
        this.setPrefGender = function (genderD, callback) {
            this.gender = {
                isForAll: false,
                genders: []
            };
            if (genderD == "All") {
                this.gender.isForAll = true;
            }
            else {
                this.gender.genders.push(genderD);
            }
            callback();
        };
    }
    LeagueDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.configureForm();
        // Binding selected table row data with form 
        this.name = this.route.snapshot.params['name'];
        this.description = this.route.snapshot.params['description'];
        var leagueBanner = this.route.snapshot.params['banner'];
        this.banner = leagueBanner;
        var gender = this.route.snapshot.params['preferredGender'];
        if (gender) {
            gender = JSON.parse(gender);
            if (gender.isForAll !== true) {
                if (gender.genders.length > 0) {
                    this.preferredGender = gender.genders[0];
                }
            }
            else {
                this.preferredGender = "All";
            }
        }
        var agegrp = this.route.snapshot.params['preferredAgeGroup'];
        if (agegrp) {
            agegrp = JSON.parse(agegrp);
            this.prefAgeGroup.forEach(function (element) {
                element.status = false;
                if (agegrp.range.filter(function (ele) {
                    return ele.min == element.min && ele.max == element.max;
                }).length > 0) {
                    element.status = true;
                }
                else if (agegrp.isForAll == true) {
                    _this.prefAgeGroup.forEach(function (element) {
                        if (element.value == 'All') {
                            element.status = true;
                        }
                    });
                }
            });
        }
        var lang = this.route.snapshot.params['preferredLanguage'];
        if (lang) {
            lang = JSON.parse(lang);
            this.prefLang.forEach(function (element) {
                element.status = false;
                if (lang.language.filter(function (ele) {
                    return ele == element.value;
                }).length > 0) {
                    element.status = true;
                }
                else if (lang.isForAll == true) {
                    _this.prefLang.forEach(function (element) {
                        if (element.value == 'All') {
                            element.status = true;
                        }
                    });
                }
            });
        }
    };
    LeagueDetailComponent.prototype.configureForm = function () {
        var _this = this;
        this.prefAgeArray = new forms_1.FormArray([]);
        this.prefAgeGroup.forEach(function (element) {
            _this.prefAgeArray.push(new forms_1.FormControl(element.status));
        });
        this.leagueForm = new forms_1.FormGroup({
            name: new forms_1.FormControl("", forms_1.Validators.required),
            description: new forms_1.FormControl("", forms_1.Validators.required),
            preferredGender: new forms_1.FormControl("", forms_1.Validators.required),
            preferredLanguage: new forms_1.FormControl(),
            preferredAgeGroup: this.prefAgeArray,
            privateAccess: new forms_1.FormControl("", forms_1.Validators.required),
            banner: new forms_1.FormControl()
        });
    };
    Object.defineProperty(LeagueDetailComponent.prototype, "selectedAgeGroup", {
        get: function () {
            return this.prefAgeGroup
                .filter(function (opt) { return opt.status; })
                .map(function (opt) { return opt.value; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LeagueDetailComponent.prototype, "selectedLanguage", {
        get: function () {
            return this.prefLang
                .filter(function (opt) { return opt.status; })
                .map(function (opt) { return opt.value; });
        },
        enumerable: true,
        configurable: true
    });
    LeagueDetailComponent.prototype.addLeague = function (body) {
        var _this = this;
        this._service.addLeague(body)
            .subscribe(function (data) {
            _this.updateBanner(data.id);
        }, function (err) { return console.error(err); });
    };
    LeagueDetailComponent.prototype.fileChange = function (event) {
        this.filesToUpload = event.target.files;
        console.log('ímages changed', event.target.files);
    };
    LeagueDetailComponent.prototype.updateBanner = function (leagueId) {
        var _this = this;
        if (this.filesToUpload) {
            this._service.updateBanner(leagueId, this.filesToUpload)
                .subscribe(function (data) {
                _this.reload();
                console.log("image upload data is : ", data);
            }, function (err) {
                _this.reload();
                console.log("Error in image upload is : ", err);
            });
        }
    };
    LeagueDetailComponent.prototype.submitForm = function () {
        // console.log(this.selectedAgeGroup);
        // console.log(this.selectedLanguage);
        // console.log(this.leagueForm);
        //Gender
        this.setPrefAge(this.selectedAgeGroup, this.prefAgeGroup, function () {
        });
        this.setPrefLang(this.selectedLanguage, this.prefLang, function () {
        });
        this.setPrefGender(this.leagueForm.value["preferredGender"], function () {
        });
        // console.log(this.league);
        this.league.name = this.leagueForm.value.name,
            this.league.description = this.leagueForm.value["description"],
            this.league.banner = " ",
            this.league.thumbnail = " ",
            this.league.preferredAgeGroup = this.agegrp,
            this.league.preferredGender = this.gender,
            this.league.preferredLanguage = this.lang;
        this.addLeague(this.league);
        this.router.navigate(['./leagues']);
    };
    // update league function
    LeagueDetailComponent.prototype.update = function () {
        var id = this.route.snapshot.params['id']; // captures current leagueId
        this.setPrefAge(this.selectedAgeGroup, this.prefAgeGroup, function () { });
        this.setPrefLang(this.selectedLanguage, this.prefLang, function () { });
        this.setPrefGender(this.leagueForm.value["preferredGender"], function () { });
        this.league.id = this.route.snapshot.params['id'];
        this.league.name = this.leagueForm.value.name,
            this.league.description = this.leagueForm.value["description"],
            this.league.banner = this.leagueForm.value.banner;
        this.league.preferredAgeGroup = this.agegrp,
            this.league.preferredGender = this.gender,
            this.league.preferredLanguage = this.lang,
            this._service.updateLeague(this.league, this.league.id);
        this.updateBanner(this.league.id);
    };
    LeagueDetailComponent.prototype.delete = function () {
        this.league.id = this.route.snapshot.params['id'];
        if (confirm("Are you sure you want to delete this League ?")) {
            console.log("id of delete  is", this.league.id);
            this._service.deleteLeague(this.league.id);
        }
    };
    LeagueDetailComponent.prototype.reload = function () {
        location.reload();
        this.router.navigateByUrl('./leagues', true);
    };
    LeagueDetailComponent.prototype.resetForm = function () {
        this.leagueForm.reset();
        this.router.navigate(['./leagues']);
    };
    __decorate([
        //TODO remove
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LeagueDetailComponent.prototype, "league", void 0);
    LeagueDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "league-detail",
            templateUrl: "league-detail.component.html",
            styleUrls: ["league-detail.component.css"],
            providers: [league_service_1.LeagueService, league_list_component_1.LeagueListComponent],
        }), 
        __metadata('design:paramtypes', [league_service_1.LeagueService, league_list_component_1.LeagueListComponent, http_1.Http, router_1.ActivatedRoute, router_1.Router])
    ], LeagueDetailComponent);
    return LeagueDetailComponent;
}());
exports.LeagueDetailComponent = LeagueDetailComponent;
//# sourceMappingURL=league-detail.component.js.map