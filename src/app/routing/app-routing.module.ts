import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../component/home/home.component';
import { AdminComponent } from '../component/admin/admin.component';
import { HrComponent } from '../component/hr/hr.component';
import { ProcurementComponent } from '../component/procurement/procurement.component';
import { AccessDeniedComponent } from '../component/access-denied/access-denied.component';
import { AuthService } from '../service/auth.service';
const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        // loadChildren: () => HomeModule
        loadChildren: '../component/home/home.module#HomeModule'
        // children: [
        //     {path: '', component: HomeComponent},
        //     {path: ':TicketGuid', component: HomeTicketdetailComponent}
        //   ]
    }, {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthService],
        data: { roles: ['Admin']}
    }, {
        path: 'hr',
        component: HrComponent,
        canActivate: [AuthService],
        data: { roles: ['Hr']}
    }, {
      path: 'proc',
      component: ProcurementComponent,
      canActivate: [AuthService],
        data: { roles: ['Proc']},
        // loadChildren: () => ProcurementModule
        loadChildren: '../component/procurement/procurement.module#ProcurementModule'
    }, {
        path: 'accessdenied',
        component: AccessDeniedComponent
    },
    {
        path: '',
        component: HomeComponent
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    declarations: []
})

export class AppRoutingModule {}
