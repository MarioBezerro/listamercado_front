import { Component, OnInit } from '@angular/core';
import { Lista } from 'src/app/model/Lista';
import { ListasService } from 'src/app/servicos/listas.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.css']
})
export class ListasComponent implements OnInit {

  public listas: Lista[] = [];
  public novaLista: Lista;
  constructor(private service: ListasService) {
    this.novaLista = new Lista;
   }

  ngOnInit(): void {
    this.getAllListas();
  }


  public getAllListas(){
    this.service.recuperarListas().subscribe(
      (res: Lista[]) => {
        this.listas = res;
      },
      (err) => {
        alert("Erro ao recuperar listas de compras.");
      }
    );
  }

  public cadastrarLista(){
    //Para testar no console
   // console.log(this.novaLista);

   //Para chamr o serviço do banco
   this.service.cadastrarLista(this.novaLista).subscribe(
    (res: Lista) => {
      alert("Lista cadastrada com sucesso");
      this.getAllListas();
    },
    (err) => {
      alert("Erro ao cadastrar nova lista");
    }
   );
  }
}
