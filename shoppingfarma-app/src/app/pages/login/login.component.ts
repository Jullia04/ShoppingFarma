import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.loginService.login(email, password).subscribe(
        (users) => {
          if (users.length) {
            alert('Login realizado com sucesso!');
            this.router.navigate(['/home']); // redireciona para uma rota protegida, por exemplo
          } else {
            alert('E-mail ou senha inválidos');
          }
        },
        (error) => {
          alert('Erro ao conectar com a API');
          console.error(error);
        }
      );
    }
  }
}
