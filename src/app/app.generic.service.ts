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


    protected httpGet(url:string, host?:string):Observable<any>{
        if(host===undefined || host===null){
            host=this.API_HOST;
        }
        return this.http.get(`${host}${url}`, {headers:this.header});
    }

    protected httpPost(url:string, json?:any, host?:string):Observable<any>{
        if(host===undefined || host===null){
            host=this.API_HOST;
        }
        console.info('header: '+this.header.get('Content-Type'));
        return this.http.post(`${host}${url}`, json !== undefined ?JSON.stringify(json): undefined, {headers:this.header});
    }

    protected redirectTo(url:string[], params?:NavigationExtras){
        this.router.navigate(url, params);
    }
}