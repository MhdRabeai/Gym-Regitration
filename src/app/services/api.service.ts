import { Userr } from '../models/userr';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = 'https://json-server-avob.onrender.com/enquiry';
  constructor(private http: HttpClient) {}
  postRegistration(registerObj: Userr) {
    return this.http.post<Userr[]>(`${this.baseUrl}`, registerObj);
  }
  getRegisterUser() {
    return this.http.get<Userr[]>(`${this.baseUrl}`);
  }
  updateRegisterUser(registerObj: Userr, id: number) {
    return this.http.put<Userr[]>(`${this.baseUrl}/${id}`, registerObj);
  }
  deleteRegisterUser(id: number) {
    return this.http.delete<Userr[]>(`${this.baseUrl}/${id}`);
  }
  getRegisterUserId(id: number) {
    return this.http.get<Userr>(`${this.baseUrl}/${id}`);
  }
}
