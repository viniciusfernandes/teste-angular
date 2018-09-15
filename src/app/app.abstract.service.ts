import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";
import { Http, Headers, RequestOptions, Response, Request } from "@angular/http";
import { Observable } from "rxjs";
import { REST_API } from "./app.rest.api";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { AbstractComponent } from "./app.abstract.component";

@Injectable()
export abstract class AbstractService {
   
    protected constructor(private http:Http, private router:Router, private route:ActivatedRoute){}

    protected httpGet(url:string):Observable<any>{
        return this.http.get(`${REST_API}${url}`).pipe(map(resp=>resp.json()));
    }

    protected httpPost(url:string, object:any):Observable<any>{
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let option = new RequestOptions({headers: headers});
        
        return this.handleResponse(this.http.post(`${REST_API}${url}`, JSON.stringify(object), option));
    }

    protected redirectTo(url:string[], params?:NavigationExtras){
        this.router.navigate(url, params);
    }

    private handleResponse(observable:Observable<any>):Observable<any>{
        return observable.pipe(map(resp =>  resp.json()));
    }
}