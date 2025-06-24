import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth'; // adapte si besoin

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post<{ token: string; refreshToken: string }>(
      `${this.apiUrl}/login`,
      { email, password }
    );
  }
  register(user: User): Observable<string> {
    return this.http.post(`${this.apiUrl}/register`, user, {
      responseType: 'text',
    });
  }

  saveToken(token: string, refreshToken: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
    window.location.reload();
    this.router.navigate(['/']);
  }

  getUserEmail(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload); // décodage base64
      const payloadObj = JSON.parse(decodedPayload);
      return payloadObj.email || payloadObj.sub || null;
    } catch (e) {
      console.error('Erreur lors du décodage du token :', e);
      return null;
    }
  }
  getUserName(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      const payloadObj = JSON.parse(decodedPayload);
      return payloadObj.name || null;
    } catch (e) {
      console.error('Erreur lors du décodage du token :', e);
      return null;
    }
  }

  getUserId(): number {
    const token = localStorage.getItem('token'); // ou 'authToken' selon ton stockage
    if (!token) return 0;

    try {
      // Le token JWT est en 3 parties séparées par '.'
      // La 2e partie (index 1) est le payload encodé en base64url
      const payloadBase64 = token.split('.')[1];

      // Fonction pour décoder base64url en JSON
      const payloadJson = atob(
        payloadBase64.replace(/-/g, '+').replace(/_/g, '/')
      );
      const payload = JSON.parse(payloadJson);

      // Supposons que l'id est dans la propriété 'id' ou 'userId' du payload
      return payload.id || payload.userId || 0;
    } catch (error) {
      console.error('Erreur lors du décodage du token JWT', error);
      return 0;
    }
  }
  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || null;
    } catch (e) {
      console.error('Erreur lors du décodage du token :', e);
      return null;
    }
  }
}
