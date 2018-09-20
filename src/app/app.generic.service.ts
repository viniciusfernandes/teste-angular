import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";
import { Http, Headers, RequestOptions, Response, Request } from "@angular/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { AbstractComponent } from "./app.abstract.component";
import { IfStmt } from "@angular/compiler";

@Injectable()
export class GenericService {
    private  API_HOST = '//localhost:8080';
    private  REQ_OPTIONS:RequestOptions;
  
   protected constructor(private http:Http, private router:Router, private route:ActivatedRoute){
       let h =new Headers();
       h.append('Content-Type', 'application/json');
       this.REQ_OPTIONS = new RequestOptions({headers: h});
   }

    protected httpGet(url:string):Observable<any>{
        return this.http.get(`${this.API_HOST}${url}`).pipe(map(resp=>resp.json()));
    }

    protected httpPost(url:string, json:any, host?:string):Observable<any>{
        if(host===undefined){
            host=this.API_HOST;
        }
        return this.toJson( this.http.post(`${host}${url}`, 
                                    JSON.stringify(json), this.REQ_OPTIONS ));
    }

    protected redirectTo(url:string[], params?:NavigationExtras){
        this.router.navigate(url, params);
    }

    private toJson(observable:Observable<any>):Observable<any>{
        return observable.pipe(map(resp =>  resp.json()));
    }
}