import { Component, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Pessoa } from './pessoa.model';
import { PessoaService } from './pessoa.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Observable, observable } from 'rxjs';
import { AbstractComponent } from '../app.abstract.component';
import { AuthenticationService } from '../app.authentication.service';


@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent extends AbstractComponent {

  private pessoa: Pessoa = new Pessoa();
private inclusaoPermitida:boolean=false;
private pesquisaPermitida:boolean=false;

  constructor(private pessoaService: PessoaService, route: ActivatedRoute, router: Router, authService:AuthenticationService) {
    super(route, router, authService);
    
  }



  onInit() {
    this.inclusaoPermitida = this.isAdmin();
    this.pesquisaPermitida = this.isUser();

    let params = this.redirectParams();
    if (params !== null || params !== undefined) {
      if (params.idPessoa === null || params.idPessoa === undefined) {
        this.pessoa = new Pessoa();
      } else {
        let observable = this.pessoaService.pesquisarPessoaById(params.idPessoa);
        this.redirect({ observable: observable, ok: (data) => this.pessoa = data });
      }
    }
  }

  onDestroy(){
    this.pessoa=null;
  }




  pesquisarPessoaByNome() {
    let nomePessoa = this.pessoa.nome;

    if (nomePessoa === undefined) {
      nomePessoa = null;
    }
    console.info('nome:' + nomePessoa + ' pessoa: ' + this.pessoa);
    this.redirect({ path: ['/pessoa/listagem'], params: { queryParams: { nome: nomePessoa } } });
  }

  limparPessoa() {
    this.pessoa = new Pessoa();
  }

  inserirPessoa() {
    if (this.pessoa == null || this.pessoa == undefined) {
      return;
    }
    let obsr: Observable<any> = this.pessoaService.inserirPessoa(this.pessoa);
    this.redirect({ observable: obsr, path: ['/pessoa/listagem'], pathFail: ['/pessoa'] });
  }
 
}
