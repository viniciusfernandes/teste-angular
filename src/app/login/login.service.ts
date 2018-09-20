import { GenericService } from "../app.generic.service";
import { Login } from "./login.model";
import { Router, ActivatedRoute } from "@angular/router";
import { Http } from "@angular/http";
import { Observable } from "rxjs";

export class LoginService extends GenericService{
    private static token:string;
    private static readonly AUTENTICATION_HOST:string = '//localhost:8081';
      erros:string;
      private token:string;
  private roles:string[];
  constructor( http:Http,  route:ActivatedRoute,router:Router ){
       super(http,router,route);
}
    gerarToken(login:Login, ok?:any, fail?:any){
        this.httpPost('/auth', {"email":login.email, "senha":login.senha}, LoginService.AUTENTICATION_HOST)
                    .subscribe(
                        resp=>{
                            this.token=resp.data.token;
                            this.roles = resp.data.roles;
                            if(ok!==undefined){
                                ok(resp);
                            }
                        }, 
                        error=>{
                            if(fail!==undefined){
                                fail(error);    
                            }
                        }
                    );
                       
    }

}