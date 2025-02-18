import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { provideServerRoutesConfig } from '@angular/ssr';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { serverRoutes } from './app.routes.server';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [AppModule, ServerModule,ReactiveFormsModule],
  providers: [provideServerRoutesConfig(serverRoutes)],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
