import { Component, OnInit } from '@angular/core';
import { Login } from './login.model';
import { AbstractComponent } from '../app.abstract.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { AuthenticationService } from '../app.authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends AbstractComponent {
  private login:Login=new Login();
  private erros:string;
  
  constructor(http:Http,  route:ActivatedRoute, router:Router, authService:AuthenticationService){
    super(route, router, authService);
    this.setAuthenticationNotRequired();
  }

 onInit(){
   this.login  = new Login();
   this.login.email='admin@email.com';
   this.login.senha='123456';
 }

 onDestroy(){
   this.login=null;
   this.erros=null;
 }

 authenticate(){
  this.authService.generateToken(this.login, 
      (resp)=> this.redirect({path:['/pessoa']}), 
      (error)=>this.erros='Usuário/Senha inválidos!'
    );
 }


}
