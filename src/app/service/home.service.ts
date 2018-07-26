import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpClientModule} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import { Observable, throwError } from '../../../node_modules/rxjs';
import {UserData} from '../model/UserData';
import { Airport } from '../model/Airport';
import { Ticketdetails } from '../model/ticketdetails';
import { AppConfig } from '../config/app-config';

const uri = AppConfig.endpoints.ticket;
@Injectable({
  providedIn: 'root'
})

export class HomeService {
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

  GetTickets(): Observable<Array<any>> {
    return this
      .http
      .get<Array< any >>(uri + 'GetTickets')
      .pipe(map(res => {
        return res;
      }), catchError(err => this.handleError(err)));
  }

  GetTicketByGUID(guid: string): Observable<any> {
    return this.http.get(uri + 'GetTicketByUser/' + guid).pipe(map(res => {
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

  GetAirportByCountry(countryname: string): Observable<Array<Airport>> {
    return this
      .http
      .get<Array< Airport >>(uri + 'GetAirport/' + countryname)
      .pipe(map(res => {
        return res;
      }));
  }

  PostTicketRequest(tkt: Array<Ticketdetails>): Observable<any> {
    return this
    .http
    .post(uri + 'SendRequest', JSON.stringify(tkt), this.options)
    .pipe(map(res => {
      return res;
    }), catchError(err => this.handleError(err)));
  }

  private handleError(error: any) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(error.error.Message);
  }
}
