import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeTicketdetailComponent } from './home-ticketdetail/home-ticketdetail.component';
import { HomeRouting } from './home-routing';
import {NgmaterialModule} from 'src/app/module/ngmaterial/ngmaterial.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { HomeRequestComponent } from './home-request/home-request.component';
import { FileUploadModule } from '../../../../node_modules/ng2-file-upload';
@NgModule({
  imports: [
    CommonModule,
    NgmaterialModule,
    HomeRouting,
    ReactiveFormsModule,
    FormsModule,
    FileUploadModule
  ],
  declarations: [
    HomeTicketdetailComponent,
    HomeComponent,
    HomeRequestComponent
  ]
})
export class HomeModule { }
