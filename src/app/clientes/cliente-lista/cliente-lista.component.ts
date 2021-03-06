import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';

import { Subscription } from 'rxjs';



@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css']
})
export class ClienteListaComponent implements OnInit, OnDestroy{
  
  clientes: Cliente[] = []
  private clientesSubscription: Subscription
  public estaCarregando: boolean = false
  
  constructor (private clienteService: ClienteService){
  }

  ngOnInit(): void {
    this.estaCarregando = true
    this.clientesSubscription = this.clienteService.getListaDeClientesAtualizadaObservable()
    .subscribe((clientes: Cliente[]) => {
      this.estaCarregando = false
      this.clientes = clientes
    })
    this.clienteService.getClientes()
  }

  ngOnDestroy(): void {
    this.clientesSubscription.unsubscribe()    
  }

  onDelete (id: string): void{
    this.clienteService.removerCliente(id);
  }




}
