import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Post } from '../post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }
  updatePost(id: number, updatedData: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${id}`, updatedData);
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}



