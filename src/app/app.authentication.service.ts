import { Router, ActivatedRoute } from "@angular/router";
import { Http } from "@angular/http";
import { Login } from "./login/login.model";
import { GenericService } from "./app.generic.service";
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import { Inject,Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class AuthenticationService extends GenericService {
    private readonly AUTENTICATION_HOST:string = '//localhost:8081';
    private auth:any;
  
  constructor( http:HttpClient,  route:ActivatedRoute,router:Router, 
                @Inject(LOCAL_STORAGE)private storage:StorageService ){
       super(http,router,route);
       this.auth = this.storage.get('auth');

}
    generateToken(login:Login, onSucess?:any, onError?:any){
        this.httpPost('/auth', {"email":login.email, "senha":login.senha}, this.AUTENTICATION_HOST)
                    .subscribe(
                        resp=>{
                            console.info('generate token status: '+(JSON.stringify(resp)));
                            this.storage.set('auth', resp.data);
                            if(onSucess!==undefined){
                                onSucess(resp);
                            }
                        }, 
                        error=>{
                            console.info('generate token error status: '+JSON.stringify(error));
                            this.storage.remove('auth');
                            if(onError!==undefined){
                                onError(error);    
                            }
                        }
                    );
                       
    }

     hasRole(role:string):boolean {
        return  this.auth && this.auth.roles.indexOf(role)>=0;
    }

    hasToken():boolean{
        return  this.auth && this.auth.token;
    }

    getToken():string{
        return this.auth && this.auth.token? this.auth.token: '';
    }


}