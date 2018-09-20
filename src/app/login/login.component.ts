import { Component, OnInit } from '@angular/core';
import { Login } from './login.model';
import { AbstractComponent } from '../app.abstract.component';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './login.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends AbstractComponent {
  private login:Login;
  private erros:string;
  private loginService:LoginService ; 
  
  constructor(http:Http,  route:ActivatedRoute, router:Router){
    super(route, router);
this.loginService =new LoginService(http,route,router);

  }
 onInit(){
   this.login  = new Login();
 }

 onDestroy(){
   this.login=null;
   this.erros=null;
 }

 autenticar(){
  this.loginService.gerarToken(this.login, 
      (resp)=> this.redirect({path:['/pessoa']}), 
      (error)=>this.erros='Usuário/Senha inválidos!'
    );
 }

}
