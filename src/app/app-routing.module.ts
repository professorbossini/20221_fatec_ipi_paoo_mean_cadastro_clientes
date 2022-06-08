import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClienteInserirComponent } from "./clientes/cliente-inserir/cliente-inserir.component";
import { ClienteListaComponent } from "./clientes/cliente-lista/cliente-lista.component";

const routes: Routes = [
    //localhost:4200/
    {path: '', component: ClienteListaComponent},
    //localhost:4200/criar
    {path: 'criar', component: ClienteInserirComponent},
    //localhost:4200/editar/whatever
    {path: 'editar/:idCliente', component: ClienteInserirComponent}
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{

}