import { Observable } from "rxjs";
import { Router, ActivatedRoute, Params, NavigationExtras } from "@angular/router";
import { OnDestroy, OnInit } from "@angular/core";

import { ROLE_ADMIN, ROLE_USER } from "./app.user.roles";
import { AuthenticationService } from "./app.authentication.service";
import { AbstractService } from "./app.abstract.service";


export abstract class AbstractComponent implements OnInit, OnDestroy{
    errorMessages:string[]=[];
    private authenticationRequired:boolean =true;
    protected onInit:()=>void;
    protected onDestroy:()=>void;
    private servicesToUnsubscribe:AbstractService[]=[];
    protected constructor(private route:ActivatedRoute, private router:Router, public authService:AuthenticationService, ...services:AbstractService[]){
        this.servicesToUnsubscribe.push(authService);
        if(services){
            services.forEach(service => {
                this.servicesToUnsubscribe.push(service);
            });
        }
    }

    ngOnInit(){
        if(this.authenticationRequired){
            this.authService.isAuthenticated(()=>this.onInit(), ()=> this.doRedirect({path:['/login']}));
        }
    }

    ngOnDestroy(){
        this.errorMessages=null;
        this.route=null;
        this.router=null;
        this.servicesToUnsubscribe.forEach(service => {
            service.ngOnDestroy();
        });
        this.onDestroy();
    }

    protected redirectParams():any{
        let redirParam :any = null;
        this.route.queryParams.subscribe(params => redirParam=params);
        return redirParam;
    }

    protected redirect(redirection){
        this.authService.isAuthenticated(()=>this.doRedirect(redirection), ()=> this.doRedirect({path:['/login']}));
    }

private doRedirect(redirection){
        
        let observable:Observable<any> = redirection.observable;
        let ok:any = redirection.ok;
        let path:string[] = redirection.path;
        let fail:any = redirection.fail;
        let pathFail:string[] = redirection.pathFail;
        let params:NavigationExtras = redirection.params;
        
        if(observable!==undefined){
            observable.subscribe(
                data=>{
                    if(path !== undefined && path !== null){
                        console.info('navegando: '+path);
                        this.router.navigate(path);   
                    }
                    if(ok!==undefined){
                        ok(data);
                    }
                }, 
                error => {
                    if(error.status === 400 || error.status === 500){
                        this.errorMessages=JSON.parse(error._body);
                        if(pathFail !== undefined && pathFail !== null){
                            this.router.navigate(pathFail);   
                        }
                    }
                    
                    if(fail !== undefined && fail !== null){
                        fail();   
                    }
                }
            );
        } else if(path !== undefined && path !== null){
            console.info('redirecionando: '+path);
            this.router.navigate(path, params);
        }
    
}

    protected isAdmin():boolean{
        return this.authService.hasRole(ROLE_ADMIN);
    }

    
    protected isUser():boolean{
        return this.authService.hasRole(ROLE_USER);
    }

    protected setAuthenticationRequired(){
        this.authenticationRequired=true;
    }
    protected setAuthenticationNotRequired(){
        this.authenticationRequired=false;
    }
}