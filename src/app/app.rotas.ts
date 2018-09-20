import { Routes } from "@angular/router";
import { PessoaComponent } from "./pessoa/pessoa.component";
import { PessoaListagemComponent } from "./pessoa-listagem/pessoa-listagem.component";
import { LoginComponent } from "./login/login.component";

export const ROTAS:Routes=[
    { path: '', redirectTo: 'pessoa', pathMatch: 'full' },
    {path:'login', component:LoginComponent},
    {path:'pessoa', component:PessoaComponent},
    {path:'pessoa/listagem', component:PessoaListagemComponent}
]