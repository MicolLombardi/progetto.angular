import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  standalone: false,
})
export class PostDetailComponent implements OnInit {
  post: any = {};
  isAdmin: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.isAdmin = user.role === 'admin';

    if (id) {
      this.postService.getPostById(+id).subscribe((data) => {
        this.post = data;
      });
    }
  }

  onSaveChanges(): void {
    if (this.post.id) {
      this.postService.updatePost(this.post.id, this.post).subscribe(() => {
        alert('Post aggiornato con successo!');
        this.router.navigate(['/posts']);
      });
      
    }
  }

  onDeletePost(): void {
    if (this.post.id && confirm('Sei sicuro di voler eliminare questo post?')) {
      this.postService.deletePost(this.post.id).subscribe(() => {
        alert('Post eliminato con successo!');
        this.router.navigate(['/posts']);
      });
    }
  }
}
