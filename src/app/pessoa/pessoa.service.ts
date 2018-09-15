import { Http, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs";
import { Pessoa } from "./pessoa.model";
import { Injectable, ErrorHandler } from "@angular/core";
import { map, concat } from "rxjs/operators";
import { REST_API } from "../app.rest.api";
import { AbstractService } from "../app.abstract.service";
import { Router, ActivatedRoute } from "@angular/router";


@Injectable()
export class PessoaService extends AbstractService{
    constructor( http:Http, router:Router, route:ActivatedRoute){
        super(http, router, route);
    }

    pesquisarPessoaByNome(nome:string):Observable<any>{
        return this.httpGet(`/pessoa/${nome}/listagem`);;
    }

    pesquisarPessoaById(id:string): Observable<any>{     
        return this.httpGet(`/pessoa/${id}`);
    }

    pesquisarPessoa(): Observable<Pessoa[]>{
        return this.httpGet(`/pessoa/listagem`);
    }

    inserirPessoa(pessoa:Pessoa): Observable<any>{
        return this.httpPost('/pessoa', pessoa);
    }

    
}

    