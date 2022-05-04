import { Component, EventEmitter, Output } from '@angular/core'
import { Cliente } from '../cliente.model';

@Component({
    selector: 'app-cliente-inserir',
    templateUrl: './cliente-inserir.component.html',
    styleUrls: ['./cliente-inserir.component.css']
})
export class ClienteInserirComponent{

    @Output()
    clienteAdicionado = new EventEmitter<Cliente>();

    nome: string;
    fone: string;
    email: string;

    onAdicionarCliente(){
        //1. construir um objeto cliente que contém nome, fone e e-mail
        const cliente: Cliente = {
            nome: this.nome,
            fone: this.fone,
            email: this.email
        }
        //2. passar esse objeto como argumento para o método emit
        this.clienteAdicionado.emit(cliente);
    }

}