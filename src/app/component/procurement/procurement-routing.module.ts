import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcurementComponent } from './procurement.component';
import { ProcTicketDetailComponent } from './proc-ticket-detail/proc-ticket-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ProcurementComponent,
    pathMatch: 'full'
}, {
    path: 'proc/:guid',
    component: ProcTicketDetailComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcurementRoutingModule { }
