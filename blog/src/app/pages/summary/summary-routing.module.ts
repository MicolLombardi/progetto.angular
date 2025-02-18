import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SummaryComponent } from '../../summary/summary.component';


const routes: Routes = [
  { path: ':id', component: SummaryComponent }, // Rote dinamica con parametri (id)
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  // RouterModule forChild per il lazy loading
  exports: [RouterModule]
})
export class SummaryRoutingModule { }
