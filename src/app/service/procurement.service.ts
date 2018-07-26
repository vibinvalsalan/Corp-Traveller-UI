import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpClientModule} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import { Observable, throwError } from '../../../node_modules/rxjs';
import {UserData} from '../model/UserData';
import { Airport } from '../model/Airport';
import { Ticketdetails } from '../model/ticketdetails';
import { AppConfig } from '../config/app-config';

const uri = AppConfig.endpoints.proc;
@Injectable({
  providedIn: 'root'
})

export class ProcurementService {
  httpHeaders: HttpHeaders;
  options: any;
  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache');
    this.options = {
      headers: this.httpHeaders
    };
  }

  GetUserDetails(sfid: string): Observable<Array<UserData>> {
    return this
      .http
      .get<Array< UserData >>(uri + 'GetUserDetails/' + sfid)
      .pipe(map(res => {
        return res;
      }), catchError(err => this.handleError(err)));
  }

  GetTicketsPendingApprovalProc(): Observable<Array<any>> {
    return this
      .http
      .get<Array<any>>(uri + 'GetTicketsPendingApprovalProc')
      .pipe(map(res => {
        return res;
      }), catchError(err => this.handleError(err)));
  }

  GetTicketsClosedByProc(): Observable<Array<any>> {
    return this
      .http
      .get<Array<any>>(uri + 'GetTicketsClosedByProc')
      .pipe(map(res => {
        return res;
      }), catchError(err => this.handleError(err)));
  }

  GetTicketsCancelled(): Observable<Array<any>> {
    return this
      .http
      .get<Array<any>>(uri + 'GetTicketsCancelled')
      .pipe(map(res => {
        return res;
      }), catchError(err => this.handleError(err)));
  }


  // GetTickets(): Observable<Array<any>> {
  //   return this
  //     .http
  //     .get<Array< any >>(uri + 'GetTickets')
  //     .pipe(map(res => {
  //       return res;
  //     }), catchError(err => this.handleError(err)));
  // }

  GetTicketByGUID(guid: string): Observable<any> {
    return this.http.get(uri + 'GetTicket/' + guid).pipe(map(res => {
      return res;
    }), catchError(err => this.handleError(err)));
  }

  GetTicketDetailsByGUID(tktguid: string): Observable<any> {
    return this.http.get(uri + 'GetTicketDetails/' + tktguid).pipe(map(res => {
      return res;
    }), catchError(err => this.handleError(err)));
  }

  GetTicketLogsByGUID(tktguid: string): Observable<any> {
    return this.http.get(uri + 'GetTicketLogs/' + tktguid).pipe(map(res => {
      return res;
    }), catchError(err => this.handleError(err)));
  }

  // GetAirportByCountry(countryname: string): Observable<Array<Airport>> {
  //   return this
  //     .http
  //     .get<Array< Airport >>(uri + 'GetAirport/' + countryname)
  //     .pipe(map(res => {
  //       return res;
  //     }));
  // }

  ProceedTicket(tkt): Observable<any> {
    return this
    .http
    .post(uri + 'ProceedTicket', JSON.stringify(tkt), this.options)
    .pipe(map(res => {
      return res;
    }), catchError(err => this.handleError(err)));
  }

  UpdateTicketRequest(tkt): Observable<any> {
    return this
    .http
    .post(uri + 'UpdateTicketRequest', JSON.stringify(tkt), this.options)
    .pipe(map(res => {
      return res;
    }), catchError(err => this.handleError(err)));
  }

  export(tkt) {
    return this.http.post(AppConfig.endpoints.ticket + 'DownloadFile', JSON.stringify(tkt),
        {responseType: 'blob', headers: this.httpHeaders});
}

  private handleError(error: any) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      // console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // console.error(
      //   `Backend returned code ${error.status}, ` +
      //   `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(error.error.Message);
  }
}

