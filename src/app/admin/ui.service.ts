import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../const/config';

@Injectable({
  providedIn: 'root'
})
export class UIService {

  constructor(private _httpClient : HttpClient) { }

  GetUICalls(ResourceName: string , obj : any){
    return new Promise((resolve,reject)=>{
      let url = baseUrl +"/"+ ResourceName
      this._httpClient.post(url,obj)
      .toPromise()
      .then(val=> 
        resolve(val)
      )
      .catch(error=>{
        reject(error)
      })

    });
  }
}
