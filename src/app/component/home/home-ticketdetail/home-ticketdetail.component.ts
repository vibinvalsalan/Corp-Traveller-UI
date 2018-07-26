import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../../../service/home.service';
import { AppConfig } from '../../../config/app-config';

@Component({
  selector: 'app-home-ticketdetail',
  templateUrl: './home-ticketdetail.component.html',
  styleUrls: ['./home-ticketdetail.component.css']
})
export class HomeTicketdetailComponent implements OnInit {
  tktguid: string;
  tktid: string;
  tkt: any;
  tktdetails: any;
  tktlogs: any;
constructor(private route: ActivatedRoute, private _homeService: HomeService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log(params.get('guid'));
      this.tktguid = params.get('guid');
      this._homeService.GetTicketByGUID(this.tktguid).subscribe(res => {
        console.log(res);
        this.tkt = res;
        this._homeService.GetTicketDetailsByGUID(this.tktguid).subscribe(res1 => {
          this.tktdetails = res1;
        });
      },
      error => {
        console.log(error);
      });
      this._homeService.GetTicketLogsByGUID(this.tktguid).subscribe(res2 => {
        this.tktlogs = res2;
      });
    });
  }

  GetTripType(type: string): string {
    if (type.length > 1) {
      return type;
    } else {
      const y = AppConfig.triptypes.filter(x => x.value === type)[0];
    return y.type;
    }
  }

  GetValue(statusCode: number): string {
    const y = AppConfig.status.filter(x => x.key === statusCode)[0];
    return y.val;
  }

}
