import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../const/config'
import { rejects } from 'assert';
@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private _httpClient : HttpClient) { }

  PostCalls(ResourceName: string , obj : any){
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
