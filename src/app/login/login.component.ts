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
  }

 onInit(){
   this.login  = new Login();
   this.setAuthenticationNotRequired();
 }

 onDestroy(){
   this.login=null;
   this.erros=null;
 }

 autenticar(){
  this.authService.generateToken(this.login, 
      (resp)=> this.redirect({path:['/pessoa']}), 
      (error)=>this.erros='Usuário/Senha inválidos!'
    );
 }

}
