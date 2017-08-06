import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Jsonp, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { LeagueService } from '../../service/league.service';
import { League } from '../../model/league';
import { LeagueListComponent } from "../league-list/league-list.component";
import { JHAKAAS_ROOT } from '../../constant/constant';

@Component({
    moduleId: module.id,
    selector: "league-detail",
    templateUrl: "league-detail.component.html",
    styleUrls: ["league-detail.component.css"],
    providers: [LeagueService, LeagueListComponent],
})

export class LeagueDetailComponent implements OnInit {
    text = " League Detail component ";
    // hideButton: boolean = false;
    public name;
    public description;
    public banner;
    public preferredGender: any;
    public preferredAgeGroup: any;
    public preferredLanguage: any;
    public comedata;
    public LeagueList: any = [];
    public LeagueData: League[] = [];


    constructor(
        private _service: LeagueService,
        private _leaguelist: LeagueListComponent,
        private http: Http,
        private route: ActivatedRoute,
        private router: Router) { }

    private modalId = "leagueModal";

    private leagueForm: FormGroup;
    filesToUpload: FileList;
    prefAgeGroup = [
        { value: 'y', display: '10-20', status: false, min: 10, max: 20 },
        { value: 'O', display: '20-45', status: false, min: 20, max: 45 },
        { value: 'All', display: 'All', status: true, min: 0, max: 0 },
    ];

    prefLang = [
        { value: 'en', display: 'English', status: false },
        { value: 'hi', display: 'Hindi', status: false },
        { value: 'All', display: 'All', status: true }
    ];

    prefAgeArray: FormArray;//TODO remove
    services = {}//TODO remove

    @Input() league = new League(null, null, null, null, null, null, null, null);



    ngOnInit() {

        this.configureForm();

        // Binding selected table row data with form 

        this.name = this.route.snapshot.params['name'];

        this.description = this.route.snapshot.params['description'];

        let leagueBanner = this.route.snapshot.params['banner'];
        this.banner = leagueBanner;


        let gender = this.route.snapshot.params['preferredGender'];
        if (gender) {
            gender = JSON.parse(gender);
            if (gender.isForAll !== true) {
                if(gender.genders.length > 0){
                    this.preferredGender = gender.genders[0];
                }
            }
            else {
                this.preferredGender = "All";
            }
        }


        let agegrp = this.route.snapshot.params['preferredAgeGroup'];
        if (agegrp) {
            agegrp = JSON.parse(agegrp);
            this.prefAgeGroup.forEach(element => {
                element.status = false;
                if (agegrp.range.filter(function (ele) {
                    return ele.min == element.min && ele.max == element.max;
                }).length > 0) {
                    element.status = true;
                }
                else if (agegrp.isForAll == true) {
                    this.prefAgeGroup.forEach(element => {
                        if (element.value == 'All') {
                            element.status = true;
                        }
                    })

                }

            })

        }


        let lang = this.route.snapshot.params['preferredLanguage'];
        if (lang) {
            lang = JSON.parse(lang);
            this.prefLang.forEach(element => {
                element.status = false;
                if (lang.language.filter(function (ele) {
                    return ele == element.value;
                }).length > 0) {
                    element.status = true;
                }

                else if (lang.isForAll == true) {
                    this.prefLang.forEach(element => {
                        if (element.value == 'All') {
                            element.status = true;
                        }
                    })
                }
            })
        }
    }


    configureForm() {
        this.prefAgeArray = new FormArray([]);
        this.prefAgeGroup.forEach(element => {
            this.prefAgeArray.push(new FormControl(element.status));
        });


        this.leagueForm = new FormGroup({
            name: new FormControl("", Validators.required),
            description: new FormControl("", Validators.required),
            preferredGender: new FormControl("", Validators.required),
            preferredLanguage: new FormControl(),
            preferredAgeGroup: this.prefAgeArray,
            privateAccess: new FormControl("", Validators.required),
            banner: new FormControl()
        })
    }


    get selectedAgeGroup() {
        return this.prefAgeGroup
            .filter(opt => opt.status)
            .map(opt => opt.value)
    }

    get selectedLanguage() {
        return this.prefLang
            .filter(opt => opt.status)
            .map(opt => opt.value)
    }

    addLeague(body) {
        this._service.addLeague(body)
            .subscribe(data => {
                this.updateBanner(data.id);
            },
            err => console.error(err))
    }

    fileChange(event) {
        this.filesToUpload = event.target.files;

        console.log('ímages changed',event.target.files);
    }
    updateBanner(leagueId: string) {
        if(this.filesToUpload){
        this._service.updateBanner(leagueId, this.filesToUpload)
            .subscribe((data) => {  this.reload();
                                    console.log("image upload data is : ",data) },
            (err) => {  this.reload();
                        console.log("Error in image upload is : ",err) 
        }
            );
    }
    }

    agegrp = {
        isForAll: false,
        range: []
    };

    lang = {
        isForAll: false,
        language: []
    };

    gender = {
        isForAll: false,
        genders: []
    }
    setPrefAge = function (ageArr: any[], prefAge: any[], callback) {
        this.agegrp = {
            isForAll: false,
            range: []
        };
        ageArr.forEach(element => {
            console.log("element is : ", element);

            prefAge.forEach(data => {
                console.log("age data is : ", data);
                if (element == data.value) {
                    if (element != "All") {
                        let r = {
                            min: data.min,
                            max: data.max,
                        }
                        this.agegrp.range.push(r);
                    } else {
                        console.log("For all age : ", this.agegrp);

                        this.agegrp.isForAll = true;
                    }
                }
            })
        })
        callback();
    }

    setPrefLang = function (langArr: any[], prefLang: any[], callback) {
        this.lang = {
            isForAll: false,
            language: []
        };

        langArr.forEach(element => {
            console.log("testing - " + element)
            prefLang.forEach(data => {
                if (element == data.value) {
                    console.log("testing main- " + data.value)
                    if (element != "All") {
                        this.lang.language.push(data.value);
                    } else {
                        this.lang.isForAll = true;
                    }
                }
            })
        })

        callback();
    }

    setPrefGender = function (genderD: string, callback) {
        this.gender = {
            isForAll: false,
            genders: []
        };
        if (genderD == "All") {
            this.gender.isForAll = true
        }
        else {
            this.gender.genders.push(genderD);
        }
        callback();
    }

    submitForm() {
        // console.log(this.selectedAgeGroup);
        // console.log(this.selectedLanguage);
        // console.log(this.leagueForm);


        //Gender

        this.setPrefAge(this.selectedAgeGroup, this.prefAgeGroup, function () {


        })
        this.setPrefLang(this.selectedLanguage, this.prefLang, function () {

        })
        this.setPrefGender(this.leagueForm.value["preferredGender"], function () {

        })

        // console.log(this.league);
        this.league.name = this.leagueForm.value.name,
            this.league.description = this.leagueForm.value["description"],
            this.league.banner = " ",
            this.league.thumbnail = " ",
            this.league.preferredAgeGroup = this.agegrp,
            this.league.preferredGender = this.gender,
            this.league.preferredLanguage = this.lang

        this.addLeague(this.league);


        this.router.navigate(['./leagues']);
    }

    // update league function

    update() {
        let id = this.route.snapshot.params['id']; // captures current leagueId

        this.setPrefAge(this.selectedAgeGroup, this.prefAgeGroup, function () { })
        this.setPrefLang(this.selectedLanguage, this.prefLang, function () { })
        this.setPrefGender(this.leagueForm.value["preferredGender"], function () { })

        this.league.id = this.route.snapshot.params['id'];

        this.league.name = this.leagueForm.value.name,
        
        this.league.description = this.leagueForm.value["description"],
        
        this.league.banner = this.leagueForm.value.banner;
       
        this.league.preferredAgeGroup = this.agegrp,

        this.league.preferredGender = this.gender,

        this.league.preferredLanguage = this.lang,

        this._service.updateLeague(this.league, this.league.id);

        this.updateBanner(this.league.id);

    }

    delete() {
        this.league.id = this.route.snapshot.params['id'];
        if (confirm(`Are you sure you want to delete this League ?`)) {
            console.log("id of delete  is",this.league.id);

            this._service.deleteLeague(this.league.id);         
        }
     
    }

    reload() {
        location.reload();
        this.router.navigateByUrl('./leagues', true);

    }

    resetForm() {
        this.leagueForm.reset();
        this.router.navigate(['./leagues']);
    }

}