import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";
import { Observable, Subject, observable } from "rxjs";

import {  takeUntil} from "rxjs/operators";
import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export  class AbstractService implements OnDestroy {
    private  API_HOST = '//localhost:8080';
    private  header:HttpHeaders= new HttpHeaders({"Content-Type":"application/json; charset=utf-8"});
    private unsubscriptions:Subject<void>[]=[];
    protected constructor(private http:HttpClient , private router:Router, private route:ActivatedRoute){

    }

    ngOnDestroy(){
        this.unsubscriptions.forEach(subject=>{
            console.info('unsubscribing...')
            subject.next();
            subject.complete();
        });
    }

    protected doGet(url:string, host?:string):Observable<any>{
        if(host===undefined || host===null){
            host=this.API_HOST;
        }
        return this.doUnsubscribe(this.http.get(`${host}${url}`, {headers:this.header}));
    }

    protected doPost(url:string, json?:any, host?:string):Observable<any>{
        if(host===undefined || host===null){
            host=this.API_HOST;
        }
        
        return this.doUnsubscribe(this.http.post(`${host}${url}`, json !== undefined ?JSON.stringify(json): undefined, {headers:this.header}));
    }

    protected redirectTo(url:string[], params?:NavigationExtras){
        this.router.navigate(url, params);
    }

    private doUnsubscribe(observable:Observable<any>):Observable<any>{
        let subject = new Subject<void>();
        this.unsubscriptions.push(subject);
        return observable.pipe(takeUntil(subject));
    }
}