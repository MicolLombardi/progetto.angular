import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  PostRoutingModule } from './posts-routing.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PostRoutingModule,
    RouterModule
  ]
})
export class PostsModule { }
