import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  produtos: Product[] = [];
  categorias: string[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.produtos = data;
      this.categorias = [...new Set(data.map(p => p.category))];
    });
  }

  produtosPorCategoria(categoria: string): Product[] {
    return this.produtos.filter(p => p.category === categoria);
  }
}
