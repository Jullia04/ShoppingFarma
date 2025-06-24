import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
            Swal.fire({
              icon: 'success',
              title: 'Login realizado com sucesso!',
              confirmButtonColor: '#ea1d2c',
            }).then(() => {
              this.router.navigate(['/home']);
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'E-mail ou senha inválidos',
              confirmButtonColor: '#ea1d2c',
            });
          }
        },
        (error) => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Erro de conexão',
            text: 'Não foi possível conectar à API.',
            confirmButtonColor: '#ea1d2c',
          });
        }
      );
    }
  }
}
