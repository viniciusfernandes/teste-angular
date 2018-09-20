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
    private  AUTENTICATION_HOST = '//localhost:8081';
    private  REQ_OPTIONS =
        new RequestOptions({headers: new Headers([{'Content-Type': 'application/json'}])});
    private token:string;
    
   protected constructor(private http:Http, private router:Router, private route:ActivatedRoute){
       
   }

    protected isTokenOk(email:string, senha:string):boolean{
        let authResp= this.httpPost('/auth', {'email':email, 'senha':senha}).subscribe(resp=> authResp=resp);
        this.token = authResp.data.token;
        return this.token!==null &&  this.token!== '';
    }

    protected httpGet(url:string):Observable<any>{
        return this.http.get(`${this.API_HOST}${url}`).pipe(map(resp=>resp.json()));
    }

    protected httpPost(url:string, json:any, host?:string):Observable<any>{
        if(host===undefined){
            host=this.API_HOST;
        }
        return this.handleResponse( this.http.post(`${host}${url}`, 
                                    JSON.stringify(json), this.REQ_OPTIONS ));
    }

    protected redirectTo(url:string[], params?:NavigationExtras){
        this.router.navigate(url, params);
    }

    private handleResponse(observable:Observable<any>):Observable<any>{
        return observable.pipe(map(resp =>  resp.json()));
    }
}