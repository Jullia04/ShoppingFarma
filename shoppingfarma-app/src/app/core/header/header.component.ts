import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../services/login.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  usuarioLogado: User | null = null;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.usuarioLogado = this.loginService.getUsuarioLogado();
    console.log(this.usuarioLogado)
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
    console.log('Usuário deslogado');
  }

  abrirCarrinho(): void {
    console.log('Abrindo carrinho');
  }

  listarProdutos(): void {
    console.log('Listando produtos');
  }
}
