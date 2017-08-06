import { Injectable } from '@angular/core';
import { BaseRequestOptions,Jsonp, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {MockBackend} from '@angular/http/testing';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import { ActivatedRoute, Router } from '@angular/router';
// import { LeagueListComponent } from "../component/league-list/league-list.component";
import { JHAKAAS_ROOT } from '../constant/constant';

@Injectable()

export class LeagueService {

    constructor(private jsonp: Jsonp, private http: Http, private router: Router ) { }

    getAllLeagues(): Observable<any> {

        const url = JHAKAAS_ROOT + "leagues";

        return this.http.get(url)
            .map(leagues => leagues.json())
            .catch(err => {
                console.error("Unable to get leagues - " + err);
                return Observable.throw(err.json());
            }); 
            

    }

    addLeague(body): Observable<any> {
        const url = JHAKAAS_ROOT + "leagues";
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(url, bodyString, options)
            .map((res: Response) => res.json())
            .catch((err: any) => Observable.throw(err.json() || 'Server Error'));

    }

    updateBanner(leagueId:string,fileList: FileList): Observable<any> {
        const url = JHAKAAS_ROOT + "leagues/" + leagueId + "/banner";
        
       // if (fileList) {
            // let file: File = fileList[0];
            if(fileList){
            let file = fileList[0];
           console.log('file is',file);
            let headers = new Headers();
            headers.append('Content-Type', "multipart/form-data");
            //headers.append('Accept', 'application/json');
            let options = new RequestOptions({ headers: headers });
            console.log("headers - ",headers);
            
            return this.http.put(url, file, options)
            .map((res)=>res.json())
            .catch((err)=> Observable.throw(err));
        // }else {
        //     return Observable.throw("No files Found to be uploaded");
        // }
    }
}
    
 reload() {
        // location.reload();
        this.router.navigate(['./leagues']);

    }

    // edit and save league with same id
    updateLeague(data,id){
        console.log("id inside srvie method", id);
        console.log(" data inside service ts is: ",data);
        
        const url = JHAKAAS_ROOT + "leagues/" + id;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.put(url, JSON.stringify(data), {headers: headers})
             .map((res)=>res.json())
             .subscribe(success=>{ this.reload();
                 console.log("Success is : ",success);
             },err=>{this.reload();
                 console.log("Error is : ",err);

             })
        
        }
    
    // delete League
    deleteLeague(id):Observable<any>{
        console.log("league id is", id);      
        const url = "delete_api" + id ; // @TODO insert api to delete league
        return this.http.delete(url)
                .map((res:Response) => res.json()) 
               .catch((error:any) => 
                Observable.throw(error.json().error || 'Server error'));    
    }
}   

    