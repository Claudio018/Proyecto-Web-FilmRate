import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Registrar } from '../models/registrar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrarService {
  API="http://localhost:3000";
  constructor(private http:HttpClient) { 

  }

  register(data:Registrar):Observable<any>{
      return this.http.post(`${this.API}/users`,data);
  }

}
