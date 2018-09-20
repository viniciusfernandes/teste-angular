import { GenericService } from "../app.generic.service";
import { Login } from "./login.model";
import { Router, ActivatedRoute } from "@angular/router";
import { Http } from "@angular/http";

export class LoginService extends GenericService{
    private static token:string;
    private static readonly AUTENTICATION_HOST:string = '//localhost:8081';
    private erros:string;
  constructor( http:Http,  route:ActivatedRoute,router:Router ){
       super(http,router,route);
}
    gerarToken(login:Login){
        this.httpPost('/auth', {"email":login.email, "senha":login.senha}, 
                    LoginService.AUTENTICATION_HOST)
                        .subscribe(resp=> {
                            LoginService.token=resp.data.token;
                            if(LoginService.token!==undefined){
                                this.redirectTo(['/pessoa']);
                            }else{
                                this.erros='Usuário/Senha inválido(s)!';
                            }
                        });
}

}