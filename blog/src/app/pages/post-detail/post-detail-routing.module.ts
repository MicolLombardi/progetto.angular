import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostDetailComponent } from '../../post/post-detail/post-detail.component';



const routes: Routes = [
   { path: ':id', component: PostDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostDetailRoutingModule { }
