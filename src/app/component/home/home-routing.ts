import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';
import {HomeTicketdetailComponent} from './home-ticketdetail/home-ticketdetail.component';

const homeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
    }, {
        path: 'home/:guid',
        component: HomeTicketdetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(homeRoutes)],
    exports: [RouterModule]
})

export class HomeRouting {}
