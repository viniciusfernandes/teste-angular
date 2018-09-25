import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest
   } from '@angular/common/http';
   import { Observable } from 'rxjs';

import { AuthenticationService } from './app.authentication.service';
import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor{
    constructor(private authService:AuthenticationService){
    }

    intercept(request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        return next.handle(request.clone({headers: request.headers.set('Authorization', `Bearer ${this.authService.getToken()}`)}));
    }
}