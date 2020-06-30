import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor() { }
  intercept(
    request: HttpRequest<any>, next: HttpHandler
  ) : Observable<HttpEvent<any>> {
    const storageUser = localStorage.getItem('SCFUserIdentity');
    const loggedUser = storageUser ? JSON.parse(storageUser) : null;
    if (loggedUser) {
      request = request.clone({
          setHeaders:{
            'Content-Type': 'application/json; charset=utf-8',
            'dataType': 'json',
          },
          headers: request.headers.set(
            'authorization', `Bearer ${loggedUser.access_token}`
          )
      });
    }
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        // Checking if it is an Authentication Error (401)
        if (err.status === 401 || err.status === 498) {
          // <Log the user out of your application code>
          if(err.status === 498){
          }
          localStorage.clear()
          // return throwError(err);
        }
        // If it is not an authentication error, just throw it
        return throwError(err);
      })
    );
  }
}