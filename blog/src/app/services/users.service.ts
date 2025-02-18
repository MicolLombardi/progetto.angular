import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Payload, Users } from '../users';
import { UserForm } from '../form-data';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users'; 

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Errore nel recupero della lista utenti:', error);
        return of([]);
      })
    );
  }
  

  getUserById(id: number): Observable<Users> {
    return this.http.get<Users>(`${this.apiUrl}/${id}`);
  }


  createUser(formData: UserForm): Observable<Users> {
    const payload = this.mapFormToPayload(formData);
    console.log(payload);
    return this.http.post<Users>(this.apiUrl, payload);
  }

  
  updateUser(id: number, formData: UserForm): Observable<Users> {
    const payload = this.mapFormToPayload(formData);
    console.log(payload);
    return this.http.put<Users>(`${this.apiUrl}/${id}`, payload);
  }

  
  mapFormToPayload(formData: UserForm): Payload {
    return {
      fullName: formData.name,
    userHandle: formData.username,
    contactEmail: formData.email,
    streetName: formData.street,
    apartment: formData.suite,
    town: formData.city,
    postalCode: formData.zipcode
    };
  }
}  
