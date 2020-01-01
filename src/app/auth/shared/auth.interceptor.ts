import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { HttpEvent, HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    url: string;
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = this.authService.getToken();

      if (token) {
          request = request.clone({
              setHeaders: {
                  Authorization: `Bearer ${token}`,
              }
          });
      }

      return next.handle(request);
  }
}