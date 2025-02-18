import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post } from '../post';

@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe((data) => {
      this.posts = data.slice(0, 3);  // Prende solo i primi 3 post
    });
  }
}
