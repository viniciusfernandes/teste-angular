import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../pessoa/pessoa.model';
import { PessoaService } from '../pessoa/pessoa.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { AbstractComponent } from '../app.abstract.component';

@Component({
  selector: 'app-pessoa-listagem',
  templateUrl: './pessoa-listagem.component.html',
  styleUrls: ['./pessoa-listagem.component.css']
})
export class PessoaListagemComponent extends AbstractComponent implements OnInit {
  listaPessoa:Pessoa[]=[];
  idadeAsc:boolean=false;
  nomeAsc:boolean=false;
  
  constructor( private pessoaService:PessoaService, route:ActivatedRoute, router:Router) {
    super(route, router);
   }

  ngOnInit() {
    let params = this.redirectParams();
    if(params !==null || params!==undefined){
      console.info('param nome:'+params.nome);
      let observable= this.pesquisarPessoaByNome(params.nome);
      this.redirect({observable:observable, ok:data => this.listaPessoa=data});
    }
  }

  pesquisarPessoa(idPessoa:string){
    this.redirect({path:['/pessoa'], params:{queryParams:{idPessoa:idPessoa}}});
  }

  ordernarNome(){
    let idx=0;
    this.nomeAsc = !this.nomeAsc;
    this.listaPessoa= this.listaPessoa.sort((p1:Pessoa,p2:Pessoa) => {
        idx = p1.nome.localeCompare(p2.nome);
        return this.nomeAsc  ? idx: -1*idx;
      });
  }

  ordernarIdade(){
    let idx = 0;
    this.idadeAsc = !this.idadeAsc;
    console.info("asc idade: "+this.idadeAsc);
    this.listaPessoa= this.listaPessoa.sort((p1:Pessoa,p2:Pessoa) => {
      
      if(p1.idade >p2.idade){
        idx=1;
      }else if(p1.idade <p2.idade){
        idx=-1;
      }else {
        idx=0;
      }
      return this.idadeAsc? idx: -1*idx;
    });
  }
  
  inserirPessoa(){
    this.redirect({path:['/pessoa']});
  }

  private pesquisarPessoaByNome(nome:string){
    if(nome ===null || nome === undefined || nome.trim() ==='' ){
    nome = ''; 
    }
     return this.pessoaService.pesquisarPessoaByNome(nome);
    
  }
}
