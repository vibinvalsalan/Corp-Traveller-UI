import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {AdminComponent} from './component/admin/admin.component';
import {ItadminComponent} from './component/itadmin/itadmin.component';
import {HrComponent} from './component/hr/hr.component';
import {NgmaterialModule} from './module/ngmaterial/ngmaterial.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppRoutingModule} from './routing/app-routing.module';
import { AccessDeniedComponent } from './component/access-denied/access-denied.component';
import {HttpClientModule} from '@angular/common/http';
import { HomeModule } from './component/home/home.module';
import { ProcurementModule } from './component/procurement/procurement.module';

@NgModule({
    declarations: [
        AppComponent,
        AdminComponent,
        ItadminComponent,
        HrComponent,
        AccessDeniedComponent,
    ],
    imports: [
        BrowserModule,
        NgmaterialModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        HttpClientModule,
        AppRoutingModule,
        HomeModule,
        ProcurementModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
