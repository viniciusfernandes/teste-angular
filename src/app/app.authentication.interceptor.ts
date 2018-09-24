import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse,
   } from '@angular/common/http';
   import { Observable } from 'rxjs';

import { AuthenticationService } from './app.authentication.service';
export class AuthenticationInterceptor implements HttpInterceptor{
    constructor(private authService:AuthenticationService){
    }

    intercept(request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        console.info('interceptou o request: '+request.url);
        return next.handle(request.clone(
                {headers: request.headers.set('Authorization', `Bearer ${this.authService}`)}
            )
        );
    }
}