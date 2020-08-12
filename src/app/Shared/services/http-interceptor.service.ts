import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap, finalize } from 'rxjs/operators';
import { EncryptDecryptService } from './encrypt-decrypt.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DialogService } from './dialog.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private _crypto: EncryptDecryptService,private toast: ToastrService,private _dialog:DialogService
    ,private _router :Router) { }
  intercept(
    request: HttpRequest<any>, next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const storageUser = JSON.parse(sessionStorage.getItem('SCFUserToken'));
    if (storageUser) {
      const loggedUser = this._crypto.DecryptToken(storageUser );

      request = request.clone({
        setHeaders: {
          'Content-Type':  'application/json; charset=utf-8',
          'dataType': 'json',
        },
        headers: request.headers.set(
          'authorization', `Bearer ${loggedUser}`
        )
      });
    }
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401 || err.status === 498) {
          if (err.status === 498) {
            this.toast.error("Server Error")
            localStorage.clear()
              this._router.navigate(['auth/Login'])
          }
        }
        if (err.status === 405) {
         this._dialog.OpenTimedDialog({heading:"Network Error",type:2})
        }
        if (err.status === 400) {
          this._dialog.OpenTimedDialog({heading:err.error,type:4})
         }
        // If it is not an authentication error, just throw it
        return throwError(err);
      })
    );
  }
}