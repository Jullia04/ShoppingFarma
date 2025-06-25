import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  produtos: Product[] = [];
  categorias: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Product[]>('https://shopping-farma-api.vercel.app/products')
      .subscribe((data) => {
        this.produtos = data;
        this.categorias = [...new Set(data.map(p => p.category))]; // categorias únicas
      });
  }

  produtosPorCategoria(categoria: string): Product[] {
    return this.produtos.filter(p => p.category === categoria);
  }
}
