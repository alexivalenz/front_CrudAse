import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  apiServer = "http://localhost:3000/users";

  constructor(private service:HttpClient) { }

  getConsultarClientes():Observable<any>
  {
    return this.service.get(`${this.apiServer}`)
  }
}
