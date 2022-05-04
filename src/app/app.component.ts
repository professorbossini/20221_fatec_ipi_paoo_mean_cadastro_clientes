import { Component } from '@angular/core';
import { Cliente } from './clientes/cliente.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //meuNumero: number = 2
  clientes: Cliente[] = []
  onClienteAdicionado (cliente): void{
    //... operador spread
    this.clientes = [...this.clientes, cliente]
  }
}
