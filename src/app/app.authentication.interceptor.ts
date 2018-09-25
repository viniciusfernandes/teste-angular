import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest
   } from '@angular/common/http';
   import { Observable } from 'rxjs';

import { AuthenticationService } from './app.authentication.service';
import { Injectable } from '@angular/core';
@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor{
    constructor(private authService:AuthenticationService){
    }

    intercept(request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        console.info('interceptou o request: '+request.url);
        request = request.clone();
        request.headers.append('Authorization', `Bearer ${this.authService.getToken()}`);
        return next.handle(request);
    }
}