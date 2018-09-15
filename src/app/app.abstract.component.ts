import { Observable } from "rxjs";
import { Router, ActivatedRoute, Params, NavigationExtras } from "@angular/router";
import { ResponseContent } from "./app.response.content";

export class AbstractComponent {
    protected errorMessages:string[]=[];
    
    protected constructor(private route:ActivatedRoute, private router:Router){}
    
    protected redirectParams():any{
        let redirParam :any = null;
        this.route.queryParams.subscribe(params => redirParam=params);
        return redirParam;
    }

    protected redirect(redirection){
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
            this.router.navigate(path, params);
        }
    }
}