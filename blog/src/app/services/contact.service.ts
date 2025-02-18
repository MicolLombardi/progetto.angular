import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'https://67a8e8036e9548e44fc25f42.mockapi.io/contacts'; 

  constructor(private http: HttpClient) {}

  sendMessage(formData: { nome: string; cognome: string; email: string; messaggio: string }): Observable<any> {

    return this.http.post<any>(this.apiUrl, formData);
  }
}
