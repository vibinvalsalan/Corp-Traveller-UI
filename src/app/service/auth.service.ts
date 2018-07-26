import {Injectable} from '@angular/core';
import {Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {HttpClient, HttpHeaders, HttpClientModule} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {AppConfig} from '../config/app-config';
import {Observable, throwError} from '../../../node_modules/rxjs';

const uri = AppConfig.endpoints.ticket;
@Injectable({providedIn: 'root'})
export class AuthService implements CanActivate,
CanActivateChild {

    constructor(private router: Router, private http: HttpClient) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (sessionStorage.getItem('userRoles') != null) { // Checking for Roles in sessionStorage
            const roles = next.data['roles']as Array < string >;
            if (roles) {
                const match = this.roleMatch(roles);
                if (match) {
                    return true;
                } else {
                    this
                        .router
                        .navigate(['/accessdenied']);
                    return false;
                }
            }
            // } else {   this.authService.GetRole().subscribe(res => {     const roles =
            // next.data['roles'] as Array<string>; // This is done for the first time
            // because the sessionstorage is empty     if (roles) {       const match =
            // this.authService.roleMatch(roles);       if (match) {         return true;
            //    } else {         this.router.navigate(['/accessdenied']);         return
            // false;       }     }   });
        }
        this
            .router
            .navigate(['/accessdenied']);
        return false;
    }

    roleMatch(allowedRoles): boolean {
        let isMatch = false;
        const userRoles: string = sessionStorage.getItem('userRoles');
        allowedRoles.forEach(element => {
            if (userRoles === element) {
                isMatch = true;
                return false;
            }
        });
        return isMatch;
    }

    setRoles() {
      console.log(uri);
        return this.http.get < string > (uri + 'GetUserRoles').pipe(map(res => {
            sessionStorage.setItem('userRoles', res);
        }), catchError(err => this.handleError(err)));
    }


    GetRole(): any {
      return this
        .http
        .get(uri + 'GetUserRoles')
        .pipe(map( (res: any) => {
          sessionStorage.setItem('userRoles', res);
        }), catchError(this.handleError));
    }

    canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (sessionStorage.getItem('userRoles') != null) { // Checking for Roles in sessionStorage
            const roles = next.data['roles']as Array < string >;
            if (roles) {
                const match = this.roleMatch(roles);
                if (match) {
                    return true;
                } else {
                    this
                        .router
                        .navigate(['/accessdenied']);
                    return false;
                }
            } else {
                return true;
            }
        }
        this
            .router
            .navigate(['/accessdenied']);
        return false;
    }

    private handleError(error: any) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code. The response body may
            // contain clues as to what went wrong,
            console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(error.error.Message);
    }
}
