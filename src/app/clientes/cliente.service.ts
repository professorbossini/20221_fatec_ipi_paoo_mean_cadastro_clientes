import { Cliente } from "./cliente.model";
import { Subject } from 'rxjs'
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';

//single source of truth
@Injectable({providedIn: 'root'})
export class ClienteService{
    private clientes: Cliente[] = [];
    private listaClientesAtualizada = new Subject<Cliente[]>();

    constructor (private httpClient: HttpClient){

    }

    getClientes(): void{
        this.httpClient.get<{mensagem: string, clientes: any}>
        ('http://localhost:3000/api/clientes')
        .pipe(map((dados) => {
            return dados.clientes.map(( cliente ) => {
                return {
                    id: cliente._id,
                    nome: cliente.nome,
                    fone: cliente.fone,
                    email: cliente.email
                }
            })
        }))
        .subscribe((clientes) => {
            this.clientes = clientes
            this.listaClientesAtualizada.next([...this.clientes])    
        })
    }

    getCliente (id: string): Cliente {
        return {...this.clientes.find(cli => cli.id === id)}   
    }

    removerCliente(id: string): void{
        this.httpClient.delete(`http://localhost:3000/api/clientes/${id}`)
        .subscribe(() => {
            console.log(`Cliente de id: ${id} removido`)
        })
    }



    // getClientes(): Cliente[]{
        
    //     //return [...this.clientes];
    // }

    adicionarCliente (nome: string, fone: string, email: string): void{
        const cliente: Cliente = {
            nome, fone, email
        }
        this.httpClient.post<{mensagem: string, id: string}>(
            'http://localhost:3000/api/clientes',
            cliente        
        )
        .subscribe((dados) => {
            console.log(dados.mensagem)
            cliente.id = dados.id
            this.clientes.push(cliente)
            this.listaClientesAtualizada.next([...this.clientes])
        });
    }

    atualizarCliente(id: string, nome: string, fone: string, email: string){
        const cliente: Cliente = {nome, fone, email}
        this.httpClient.put(`http://localhost:3000/api/clientes/${id}`, cliente)
        .subscribe(res => {
            const copia = [...this.clientes]
            const indice = copia.findIndex(cli => cli.id === id)
            copia[indice] = {...cliente, id}
            this.clientes = copia
            this.listaClientesAtualizada.next([...this.clientes])
        })
    }

    getListaDeClientesAtualizadaObservable(){
        return this.listaClientesAtualizada.asObservable()
    }
}