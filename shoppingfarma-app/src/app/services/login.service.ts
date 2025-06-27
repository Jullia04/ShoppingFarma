import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'https://shopping-farma-api.vercel.app/users';

  private currentUserSubject = new BehaviorSubject<User | null>(
    JSON.parse(localStorage.getItem('usuarioLogado') || 'null')
  );
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado') || 'null');
    const expiration = localStorage.getItem('tokenExpiration');
    const now = new Date().getTime();

    if (usuario && expiration && now < parseInt(expiration)) {
      this.currentUserSubject.next(usuario);
    } else {
      this.logout();
    }
  }

  login(email: string, password: string): Observable<User> {
    return this.http
      .get<User[]>(`${this.apiUrl}?email=${email}&senha=${password}`)
      .pipe(
        map((users) => {
          if (users.length === 0) {
            throw new Error('Email ou senha inválidos');
          }

          const user = users[0];

          return user;
        }),
        tap((user) => {
          const expirationTime = new Date().getTime() + 60 * 60 * 1000;
          localStorage.setItem('usuarioLogado', JSON.stringify(user));
          localStorage.setItem('tokenExpiration', expirationTime.toString());
          this.currentUserSubject.next(user);
        }),
        catchError((err) => {
          return throwError(() => new Error(err.message || 'Erro no login'));
        })
      );
  }

  getUsuarioLogado(): User | null {
    const expiration = localStorage.getItem('tokenExpiration');
    const now = new Date().getTime();

    if (expiration && now > parseInt(expiration)) {
      this.logout(); // expira
      return null;
    }

    return this.currentUserSubject.value;
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('tokenExpiration');
  }

  isLogout(): boolean {
    return !!this.currentUserSubject.value;
  }
}
