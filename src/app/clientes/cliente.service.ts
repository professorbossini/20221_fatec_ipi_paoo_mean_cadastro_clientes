import { Cliente } from "./cliente.model";

export class ClienteService{
    private clientes: Cliente[] = [];

    getClientes(): Cliente[]{
        return [...this.clientes];
    }

    adicionarCliente (nome: string, fone: string, email: string): void {
        this.clientes.push({
            nome, fone, email
        })    
    }
}