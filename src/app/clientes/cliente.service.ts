import { Cliente } from "./cliente.model";
import { Subject } from 'rxjs'

//single source of truth
export class ClienteService{
    private clientes: Cliente[] = [];
    private listaClientesAtualizada = new Subject<Cliente[]>();

    getClientes(): Cliente[]{
        return [...this.clientes];
    }

    adicionarCliente (nome: string, fone: string, email: string): void {
        this.clientes.push({
            nome, fone, email
        })
        this.listaClientesAtualizada.next([...this.clientes])    
    }

    getListaDeClientesAtualizadaObservable(){
        return this.listaClientesAtualizada.asObservable()
    }
}