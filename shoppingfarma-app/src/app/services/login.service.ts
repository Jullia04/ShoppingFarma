import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://shopping-farma-api.vercel.app/users';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any[]> {
    const url = `${this.apiUrl}?email=${email}&password=${password}`;
    return this.http.get<any[]>(url);
  }
}
