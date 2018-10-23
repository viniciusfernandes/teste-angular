import { Http, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs";
import { Pessoa } from "./pessoa.model";
import { Injectable, ErrorHandler } from "@angular/core";
import { AbstractService } from "../app.abstract.service";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class PessoaService extends AbstractService {
    
    constructor( http:HttpClient, router:Router, route:ActivatedRoute){
        super(http, router, route);
    }

    pesquisarPessoaByNome(nome:string):Observable<any>{
        return this.doGet(`/pessoa/${nome}/listagem`);
    }

    pesquisarPessoaById(id:string): Observable<any>{     
        return this.doGet(`/pessoa/${id}`);
    }

    pesquisarPessoa(): Observable<Pessoa[]>{
        return this.doGet(`/pessoa/listagem`);
    }

    inserirPessoa(pessoa:Pessoa): Observable<any>{
        return this.doPost('/pessoa', pessoa);
    }

    
}

    