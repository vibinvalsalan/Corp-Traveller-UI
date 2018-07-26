import {Component, OnInit, Inject} from '@angular/core';
import {AppConfig} from '../../../config/app-config';
import {ProcurementService} from '../../../service/procurement.service';
import {ActivatedRoute} from '@angular/router';
import {formatDate} from '@angular/common';
import { saveAs } from 'file-saver';
import {
    MatSnackBar,
    MAT_DIALOG_DATA,
    MatDialogRef,
    MatSnackBarConfig,
    MatDialogConfig,
    MatDialog,
    MatIconRegistry
} from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '../../../../../node_modules/@angular/platform-browser';

@Component({
  selector: 'app-proc-ticket-detail-update',
  templateUrl: './proc-ticket-detail-update.component.html'
})

export class ProcTicketDetailUpdateComponent {
    config = new MatSnackBarConfig();
    username: string;
    tkt: any;
    commentForm: FormGroup;
    constructor(private _procService: ProcurementService,
      public snackBar: MatSnackBar,
      private _formBuilder: FormBuilder,
      @Inject(MAT_DIALOG_DATA) tktdata,
      public dialogRef: MatDialogRef < ProcTicketDetailUpdateComponent >) {
        // this.config.duration = 2000;
        console.log(tktdata);
        this.tkt = tktdata;
        console.log(this.username);
        this.commentForm = this
        ._formBuilder
        .group({
          comments: [
            '', Validators.required
          ]});
    }

    Create() {
      console.log();
      if (this.commentForm.invalid) {
        return ;
      }
      this.tkt.ProcurementComment = this.commentForm.value.comments;
        this
             ._procService
             .UpdateTicketRequest(this.tkt)
             .subscribe(res => {
                 this
                    .dialogRef
                     .close({update: true});
                 this
                     .snackBar
                     .open('Update', res, this.config);
             }, (error) => {
                 this
                     .snackBar
                     .open('Update', error, this.config);
             });
    }
}
@Component({
  selector: 'app-proc-ticket-detail',
  templateUrl: './proc-ticket-detail.component.html',
  styleUrls: ['./proc-ticket-detail.component.css']
})
export class ProcTicketDetailComponent implements OnInit {
  tktguid: string;
  tktid: string;
  tkt: any;
  tktdetails: any;
  tktlogs: any;
  userdetails: any;
  errors: string;
  updating = false;
  dialogRef: MatDialogRef < ProcTicketDetailUpdateComponent > ;

  constructor(private route: ActivatedRoute,
    private _procService: ProcurementService,
    private snackbar: MatSnackBar,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog) {
    iconRegistry.addSvgIcon(
      'Mr',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/male.svg'));
    iconRegistry.addSvgIcon(
      'Mrs',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/female.svg'));
    iconRegistry.addSvgIcon(
      'Miss',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/miss_female.svg'));
    iconRegistry.addSvgIcon(
      'Infant',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/infant.svg'));
    iconRegistry.addSvgIcon(
      'Child',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/child.svg'));
  }

    ngOnInit() {
        this
            .route
            .paramMap
            .subscribe(params => {
                this.tktguid = params.get('guid');
            });
        this.GetDetails();
    }
    Proceed(tkt) {
        this
            ._procService
            .ProceedTicket(tkt)
            .subscribe(res => {
                this.GetDetails();
            }, error => {
                this.showSnackBar('Error Occured while updating ticket', 3000);
            });
    }
    openDialog(statusCode: number): void {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.hasBackdrop = false;
      dialogConfig.width = '500px';
      this.tkt.Status = statusCode;
      dialogConfig.data = this.tkt;
      this.dialogRef = this
        .dialog
        .open(ProcTicketDetailUpdateComponent, dialogConfig);
      this
        .dialogRef
        .afterClosed()
        .subscribe(result => {
          console.log(result);
          this.GetDetails();
          // this.carriertype = result; if (result.update) {   this.GetUsers(); }
        });
    }
    GetPrefix( ) {
      return 'female';
    }
    CancelTicketRequest(tkt) {
      this
        ._procService
        .UpdateTicketRequest(tkt)
        .subscribe(res => {
          this.GetDetails();
        }, error => {
          this.showSnackBar('Error Occured while updating ticket', 3000);
        });
    }
    showSnackBar(message, delay) {
      this
        .snackbar
        .open(message, 'OK', {
          duration: delay
        });
    }
    GetDetails() {
      this.updating = true;
      this
        ._procService
        .GetTicketByGUID(this.tktguid)
        .subscribe(res => {
          this.tkt = res;
          this
            ._procService
            .GetTicketDetailsByGUID(this.tktguid)
            .subscribe(res1 => {
              this.tktdetails = res1;
              this.updating = false;
              const sfid = this.tktdetails[0].EmployeeId;
              this
                ._procService
                .GetUserDetails(sfid)
                .subscribe(res3 => {
                  this.userdetails = res3;
                }, error => {
                  this.errors = 'No details for SFID: ' + sfid; // this will show red color chip with error
                  this.showSnackBar('No details for SFID: ' + sfid, 3000);
                });
            });
        }, error => {
          console.log(error);
        });
      this
        ._procService
        .GetTicketLogsByGUID(this.tktguid)
        .subscribe(res2 => {
          this.tktlogs = res2;
        });
    }
    GetTripType(type: string): string {
      if (type.length > 1) {
        return type;
      } else {
        const y = AppConfig
          .triptypes
          .filter(x => x.value === type)[0];
        return y.type;
      }
    }
    exportPdf(tkt) {
      this._procService.export(tkt).subscribe(data => saveAs(data, tkt.UploadedFile));
    }
    GetValue(statusCode: number): string {
      const y = AppConfig
        .status
        .filter(x => x.key === statusCode)[0];
      return y.val;
    }
    GetDetailsFormatted(details): string {
      const y = AppConfig
        .userdata
        .filter(x => x.key === details.DataKey)[0];
      if (y !== undefined || y !== null) {
        if (details.DataType === 'date') {
          return y.value + ': ' + formatDate(details.DataValue, 'MMM dd, yyyy', 'en-US');
        } else {
          return y.value + ': ' + details.DataValue;
        }
      }
      return '';
    }
    }
