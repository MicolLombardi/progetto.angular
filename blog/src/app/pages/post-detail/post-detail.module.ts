import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDetailRoutingModule } from './post-detail-routing.module';
import { PostDetailComponent  } from '../../post/post-detail/post-detail.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [PostDetailComponent],
  imports: [
    CommonModule,
    PostDetailRoutingModule,
    FormsModule
  ]
})
export class PostDetailModule { }
