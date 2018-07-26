import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../../config/app-config';
import { ProcurementService } from '../../../service/procurement.service';
import { Router } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-proc-pending',
  templateUrl: './proc-pending.component.html',
  styleUrls: ['./proc-pending.component.css']
})
export class ProcPendingComponent implements OnInit {
  tkts: Array<any>;
  constructor(private _ProcService: ProcurementService, private router: Router) { }

  ngOnInit() {
    this.GetTickets();
  }

  GetTickets () {
    this._ProcService.GetTicketsPendingApprovalProc().subscribe(res => {
      this.tkts = res ;
    }, error => {
      console.error('Error');
    });
  }

  GetValue(statusCode: number): string {
    const y = AppConfig.status.filter(x => x.key === +statusCode)[0];
    return y.val;
  }

  seeTicketDetails(tkt): void {
    if (tkt) {
      this.router.navigate(['/proc' , tkt.TicketGuid]);
    }
  }
}
