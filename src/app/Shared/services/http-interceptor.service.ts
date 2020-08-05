import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap, finalize } from 'rxjs/operators';
import { EncryptDecryptService } from './encrypt-decrypt.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private _crypto: EncryptDecryptService) { }
  intercept(
    request: HttpRequest<any>, next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const storageUser = JSON.parse(sessionStorage.getItem('SCFUserToken'));
    if (storageUser) {
      const loggedUser = this._crypto.DecryptToken(storageUser );

      request = request.clone({
        setHeaders: {
          'Content-Type': request.body.fileType==undefined?'application/json; charset=utf-8':'multipart/form-data',
          'dataType': 'json',
        },
        headers: request.headers.set(
          'authorization', `Bearer ${loggedUser}`
        )
      });
    }
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        // Checking if it is an Authentication Error (401)
        if (err.status === 401 || err.status === 498) {
          // <Log the user out of your application code>
          if (err.status === 498) {
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