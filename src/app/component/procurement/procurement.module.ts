import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProcurementRoutingModule} from './procurement-routing.module';
import {ProcurementComponent} from './procurement.component';
import {ProcPendingComponent} from './proc-pending/proc-pending.component';
import {ProcTicketDetailComponent, ProcTicketDetailUpdateComponent} from './proc-ticket-detail/proc-ticket-detail.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgmaterialModule } from '../../module/ngmaterial/ngmaterial.module';
import { ProcClosedComponent } from './proc-closed/proc-closed.component';
import { ProcCancelledComponent } from './proc-cancelled/proc-cancelled.component';
import { GroupByPipe } from '../../group-by.pipe';

@NgModule({
    imports: [
        CommonModule, ProcurementRoutingModule,
        ProcurementRoutingModule,
        ReactiveFormsModule,
        NgmaterialModule,
        FormsModule
    ],
    declarations: [
        ProcurementComponent,
        ProcPendingComponent,
        ProcTicketDetailComponent,
        ProcTicketDetailUpdateComponent,
        ProcClosedComponent,
        ProcCancelledComponent,
        GroupByPipe
    ],
    entryComponents: [
        ProcTicketDetailUpdateComponent
    ]
})
export class ProcurementModule {}
