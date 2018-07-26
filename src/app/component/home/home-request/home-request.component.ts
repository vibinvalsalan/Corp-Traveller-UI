import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../../service/home.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-home-request',
  templateUrl: './home-request.component.html',
  styleUrls: ['./home-request.component.css']
})
export class HomeRequestComponent implements OnInit {

  tkts: any;
  constructor(private _homeService: HomeService,
    private router: Router) { }
 status = [
   {key: 1 , val : 'Waiting for Accounts Approval'},
   {key: 2 , val : 'Waiting for HR'},
   {key: 3 , val : 'Waiting for Procurment Approval'},
   {key: 10 , val : 'Approved/Procurment need to Get ticket'},
   {key: 11 , val : 'Wait For User to Edit'},
   {key: 12 , val : 'Ticket Closed'},
   {key: 20 , val : 'Ticket Rejected'},
   {key: 21 , val : 'Ticket Request Cancelled'}
 ];
  ngOnInit() {
    this.GetTickets();
  }

  GetValue(statusCode: number): string {
    const y = this.status.filter(x => x.key === statusCode)[0];
    return y.val;
  }
  GetTickets () {
    this._homeService.GetTickets().subscribe(res => {
      this.tkts = res ;
    }, error => {
      console.error('Error');
    });
  }

  seeTicketDetails(tkt): void {
    if (tkt) {
      this.router.navigate(['/home' , tkt.TicketGuid]);
    }
  }
}
