import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from '../services/post.service';
import { Post } from '../post';

@Component({
  selector: 'app-posts',
  standalone: false,
  
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit {
  posts: any[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe((data) => {
      this.posts = data;
    });
  }
}