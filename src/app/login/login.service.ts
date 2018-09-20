import { GenericService } from "../app.generic.service";
import { Login } from "./login.model";
import { Router, ActivatedRoute } from "@angular/router";
import { Http } from "@angular/http";

export class LoginService extends GenericService{
    
  constructor( http:Http,  route:ActivatedRoute,router:Router ){
       super(http,router,route);
}
    public logedIn(login:Login):boolean{
        return this.isTokenOk(login.email, login.senha);
    } 
}