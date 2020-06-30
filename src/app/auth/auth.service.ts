import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../const/config'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }


  PostCalls(resourceString: string, Data: any) {
    return new Promise((resolve, reject) => {
      const apiURL = `${baseUrl}/${resourceString}`;
      this._http.post(apiURL, Data)
        .toPromise()
        .then(
          res => resolve(res)
        )
        .catch(err => reject(err)
        )
    });
  }
}


