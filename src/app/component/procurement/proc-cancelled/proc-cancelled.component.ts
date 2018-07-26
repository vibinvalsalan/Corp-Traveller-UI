import { Component, OnInit } from '@angular/core';
import { ProcurementService } from '../../../service/procurement.service';
import { Router } from '@angular/router';
import { AppConfig } from '../../../config/app-config';

@Component({
  selector: 'app-proc-cancelled',
  templateUrl: './proc-cancelled.component.html',
  styleUrls: ['./proc-cancelled.component.css']
})
export class ProcCancelledComponent implements OnInit {
  tkts: Array<any>;
  constructor(private _ProcService: ProcurementService, private router: Router) { }

  ngOnInit() {
    this.GetTickets();
  }
  GetTickets () {
    this._ProcService.GetTicketsCancelled().subscribe(res => {
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
