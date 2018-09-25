import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { RouterModule, ROUTES } from '@angular/router';
import { PessoaComponent } from './pessoa/pessoa.component';
import { ROTAS } from './app.rotas';
import { PessoaService } from './pessoa/pessoa.service';
import { PessoaListagemComponent } from './pessoa-listagem/pessoa-listagem.component';
import { AuthenticationService } from './app.authentication.service';
import { LoginComponent } from './login/login.component';
import { StorageServiceModule } from 'angular-webstorage-service';
import {AuthenticationInterceptor} from './app.authentication.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PessoaComponent,
    PessoaListagemComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StorageServiceModule,
    HttpClientModule,
    RouterModule.forRoot(ROTAS)
  
  ],
  providers: [ 
    PessoaService, 
    AuthenticationService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true}
     
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
