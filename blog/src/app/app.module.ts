import { ContactComponent } from './contact/contact.component';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeModule } from './pages/home/home.module';
import { AboutModule } from './pages/about/about.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { PostsComponent } from './posts/posts.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterModule } from './auth/register/register.module';
import { LoginModule } from './auth/login/login.module';
import { Error403Component } from './error403/error403.component';
import { SummaryComponent } from './summary/summary.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ThemeService } from './services/theme.service';
import { ContactModule } from './pages/contact/contact.module';
import { DiscoverComponent } from './discover/discover.component';
import { ModalComponent } from './shared/modal/modal.component';
import { ModalModule } from './shared/modal/modal.module';
import { RiepilogoComponent } from './riepilogo/riepilogo.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
 PostsComponent,
 Error403Component,
 SummaryComponent,
 CategoryFormComponent,
 DiscoverComponent,
 RiepilogoComponent,
 ProductListComponent,
 CartComponent,
 





    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    AboutModule,
    HttpClientModule,
    FormsModule,
    RegisterModule,
    LoginModule, 
    ReactiveFormsModule,
    ContactModule,
    ModalModule
    
   

  ],
  providers: [
    provideClientHydration(withEventReplay()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ThemeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
