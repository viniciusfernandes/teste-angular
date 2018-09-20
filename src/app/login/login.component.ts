import { Component, OnInit } from '@angular/core';
import { Login } from './login.model';
import { AbstractComponent } from '../app.abstract.component';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends AbstractComponent {
  private login:Login;
  private erros:string;
  constructor(private loginService:LoginService, route:ActivatedRoute, router:Router){
    super(route, router);

  }
 onInit(){
   this.login  = new Login();
 }

 onDestroy(){
   this.login=null;
   this.erros=null;
 }

 autenticar(){
   if(this.loginService.logedIn(this.login)){
    this.redirect({path:['/pessoa']});
   }else {
    this.erros='Usuário/Senha inválidos';
   }
 }

}
