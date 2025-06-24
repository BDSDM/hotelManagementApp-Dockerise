import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('token');

    // Ne pas ajouter le token pour les routes d'authentification
    const isAuthRequest =
      req.url.includes('/auth/login') ||
      req.url.includes('api/auth/refresh-token');

    if (accessToken && !isAuthRequest) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Erreur HTTP interceptée :', error);
        return throwError(() => error);
      })
    );
  }
}
