import { FormModule } from './form/form-page.module';
import { LoginModule } from './auth/login/login.module';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { AuthGuard } from './guards/auth.guard'
import { Error403Component } from './error403/error403.component';
import { UsersComponent } from './users/users.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { DiscoverComponent } from './discover/discover.component';
import { RiepilogoComponent } from './riepilogo/riepilogo.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';


const routes: Routes = [
 {path : 'home',
  loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
},
{
  path : 'about',
  loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule)
},
{
  path: 'post-detail',
loadChildren: () => import('./pages/post-detail/post-detail.module').then(m => m.PostDetailModule),
canActivate: [AuthGuard]
},
{path: 'posts', component: PostsComponent,
  canActivate: [AuthGuard]
},
{ path: '', redirectTo: 'home', pathMatch: 'full' },
 { path: 'login', 
  loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule)},
  { path: 'register', loadChildren: () => import('./auth/register/register.module').then(m=> m.RegisterModule)},
  { path: 'error', component: Error403Component },
 { path: 'form', loadChildren: () => import('./form/form-page.module').then(m => m.FormModule),
  canActivate:[AuthGuard]
 },
 { path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule),
  canActivate: [AuthGuard]
  },
  { path: 'summary', loadChildren: () => import('./pages/summary/summary.module').then(m => m.SummaryModule),
    canActivate: [AuthGuard]
  },
  {path:'category', component: CategoryFormComponent},
  { path: 'contact', loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule) }, 
  { path:'discover', component: DiscoverComponent},
  {path:'riepilogo', component: RiepilogoComponent},
  {path:'product', component: ProductListComponent},
  { path:'cart', component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
