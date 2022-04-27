import { Component } from '@angular/core';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css']
})
export class ClienteListaComponent {

  clientes = [
    {
      nome: 'José',
      fone: '12345678',
      email: 'jose@email.com'
    },
    {
      nome: 'Maria',
      fone: '99887766',
      email: 'maria@email.com'
    }
  ]

}
