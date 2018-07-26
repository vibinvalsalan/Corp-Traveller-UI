import { Component, OnInit } from '@angular/core';
import { ProcurementService } from '../../../service/procurement.service';
import { Router } from '@angular/router';
import { AppConfig } from '../../../config/app-config';

@Component({
  selector: 'app-proc-closed',
  templateUrl: './proc-closed.component.html',
  styleUrls: ['./proc-closed.component.css']
})
export class ProcClosedComponent implements OnInit {
  tkts: Array<any>;
  constructor(private _ProcService: ProcurementService, private router: Router) { }

  ngOnInit() {
    this.GetTickets();
  }
  GetTickets () {
    this._ProcService.GetTicketsClosedByProc().subscribe(res => {
      this.tkts = res ;
    }, error => {
      console.error('Error');
    });
  }

  GetValue(statusCode: number): string {
    const y = AppConfig.status.filter(x => x.key === +statusCode)[0];
    if ( y !== undefined) {
      return y.val;
    }
    return 'Status Code not found';
  }

  // PrintTest(z) {
  //   const y = AppConfig.status.filter(x => x.key === +z)[0];
  //   console.log(y);
  // }

  seeTicketDetails(tkt): void {
    if (tkt) {
      this.router.navigate(['/proc' , tkt.TicketGuid]);
    }
  }
}
