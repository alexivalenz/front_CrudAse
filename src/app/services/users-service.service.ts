import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  apiServer = "http://localhost:3000/users";

  constructor(private service:HttpClient) { }

  getAllUsers():Observable<any>
  {
    return this.service.get(`${this.apiServer}`)
  }

  createNewUser(userInfo: User): Observable<any>{
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(userInfo);
    console.log(body)
    return this.service.post(this.apiServer, body,{'headers':headers});
  }

  updateUserById(userInfo: User): Observable<any>{
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(userInfo);
    console.log(body)
    return this.service.put(this.apiServer+'/'+userInfo.id, body,{'headers':headers});
  }


}
