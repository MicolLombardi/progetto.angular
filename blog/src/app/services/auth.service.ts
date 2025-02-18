import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { LoggedInUser } from '../logged-in-user';
import { Users } from '../users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users=[
  {username: 'admin' , password : 'admin123', role: 'admin'},
  {username: 'member' , password : 'member123', role: 'member'},
 ];
  private loggedInUserSubject = new BehaviorSubject<LoggedInUser | null>(null);

  constructor() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.loggedInUserSubject.next(JSON.parse(storedUser));
    }
  }

  getLoggedInUser(): Observable<LoggedInUser | null> {
    return this.loggedInUserSubject.asObservable();
  }

  login(username: string, password: string): Observable<string> {
    const user = this.users.find((u) => u.username === username && u.password === password);
    if (user) {
      const token = btoa(JSON.stringify({ username, role: user.role }));
      return of(token).pipe(
        delay(1000),
        tap(() => {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          this.loggedInUserSubject.next(user); // Aggiorna il BehaviorSubject con i dati dell'utente loggato
        })
      );
    }
    return throwError(() => new Error('Invalid credentials'));
  }

  register(username: string, password: string, role: string): Observable<LoggedInUser> {
    const newUser = { username, password, role };
    const userExists = this.users.some(u => u.username === username);

    if (userExists) {
      return throwError(() => new Error('Username già esistente'));
    }

    return of(newUser).pipe(
      delay(1000),
      tap(() => { 
        //integrazione servizio registrazione
      })
    );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.loggedInUserSubject.next(null); // Reset del BehaviorSubject quando l'utente esegue il logout
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
}
