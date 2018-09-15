import { Routes } from "@angular/router";
import { PessoaComponent } from "./pessoa/pessoa.component";
import { PessoaListagemComponent } from "./pessoa-listagem/pessoa-listagem.component";

export const ROTAS:Routes=[
    { path: '', redirectTo: 'pessoa', pathMatch: 'full' },
    {path:'pessoa', component:PessoaComponent},
    {path:'pessoa/listagem', component:PessoaListagemComponent}
]