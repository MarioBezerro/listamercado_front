import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemLista } from 'src/app/model/ItemLista';
import { Lista } from 'src/app/model/Lista';
import { Produto } from 'src/app/model/Produto';
import { ItenslistaService } from 'src/app/servicos/itenslista.service';
import { ListasService } from 'src/app/servicos/listas.service';
import { ProdutosService } from 'src/app/servicos/produtos.service';

@Component({
  selector: 'app-detalhelista',
  templateUrl: './detalhelista.component.html',
  styleUrls: ['./detalhelista.component.css']
})
export class DetalhelistaComponent implements OnInit {

  public listaProdutos: Produto[] = [];
  public novoProduto: Produto;
  public novoItem: ItemLista;
  public formNovoProduto: boolean = false;
  public idLista: number = 0;
  public listaCompras: Lista = new Lista();

  constructor(private produtoService: ProdutosService,
              private activateRoute: ActivatedRoute,
              private itemListaSrv: ItenslistaService,
              private listaService: ListasService) {
    this.novoProduto = new Produto();
    this.novoItem = new ItemLista();
    this.idLista = this.activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.recuperarTodosOsProdutos();
    this.recuperarDetalhesDaLista(this.idLista);
  }

  public recuperarDetalhesDaLista(idLista:number){
    this.listaService.recuperarPorId(this.idLista).subscribe(
      (res: Lista) => {
        this.listaCompras = res;
      },
      (err) => {
        alert("Não consegui recuperar a lista de compras!");
      }
    );
  }

  public recuperarTodosOsProdutos(){
    this.produtoService.getAllProdutos().subscribe(
      (res: Produto[]) => {
        this.listaProdutos = res;
      },
      (err) => {
        alert("Erro ao recuperar Lista de Produtos")
      }
    );
  }

  public exibirModal(){
    document.getElementById("btnModal")?.click();
  }

  public habilitarNovoProduto(){
    this.formNovoProduto = true;
  }

  public cadastrarNovoProduto(){
    this.produtoService.addNewProduct(this.novoProduto).subscribe(
      (res: Produto) => {
          alert("Produto cadastrado com sucesso!");
          this.novoProduto = new Produto();
          this.recuperarTodosOsProdutos();
      },
      (err) => {
        alert("Não consehui cadastrar novo produto")}
    );
    this.formNovoProduto = false;
  }

  public adicionarItemLista(){
    this.novoItem.lista.id = this.idLista;
    this.itemListaSrv.adicionarNovoItem(this.novoItem).subscribe(
      (res: ItemLista) => {
        alert("Novo item adicionado com sucesso!");
        this.novoItem = new ItemLista();
        this.recuperarDetalhesDaLista(this.idLista);
      },
      (err) => {
        alert("Item não adicionado!");
      }
    );
  }

}
