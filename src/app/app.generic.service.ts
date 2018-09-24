import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";
import { Http, Headers, RequestOptions, Response, Request } from "@angular/http";
import { Observable } from "rxjs";

import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { AuthenticationService } from "./app.authentication.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Config } from "protractor";

@Injectable()
export  class GenericService {
    private  API_HOST = '//localhost:8080';
    private  header:HttpHeaders= new HttpHeaders({"Content-Type":"application/json; charset=utf-8"});
  
   protected constructor(private http:HttpClient , private router:Router, private route:ActivatedRoute){

    }


    protected httpGet(url:string):Observable<any>{
        return this.http.get(`${this.API_HOST}${url}`);
    }

    protected httpPost(url:string, json:any, host?:string):Observable<any>{
        if(host===undefined){
            host=this.API_HOST;
        }
        console.info('header: '+this.header.get('Content-Type'));
        return this.toJson(this.http.post(`${host}${url}`, JSON.stringify(json), 
            {headers:new HttpHeaders({"Content-Type":"application/json; charset=utf-8"})}));
    }

    protected redirectTo(url:string[], params?:NavigationExtras){
        this.router.navigate(url, params);
    }

    private toJson(observable:Observable<any>):Observable<any>{
        return observable.pipe(map(resp =>  resp.json()));
    }
}