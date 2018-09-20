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
import { GenericService } from './app.generic.service';
import { LoginComponent } from './login/login.component';



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
    RouterModule.forRoot(ROTAS)
  
  ],
  providers: [ PessoaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
