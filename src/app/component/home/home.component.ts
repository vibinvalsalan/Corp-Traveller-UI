import {Component, OnInit} from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormControl,
    FormGroupDirective,
    NgForm
} from '@angular/forms';
import {FileUploader} from 'ng2-file-upload/ng2-file-upload';
import {
    trigger,
    state,
    style,
    animate,
    transition,
    group,
    stagger,
    keyframes,
    sequence
} from '@angular/animations';
import {Ticket} from '../../model/ticket';
import {Ticketdetails} from '../../model/ticketdetails';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ErrorStateMatcher} from '@angular/material/core/typings/error/error-options';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {HomeService} from '../../service/home.service';
import {Airport} from '../../model/Airport';
import {AppConfig} from '../../config/app-config';
import {ReplaySubject, Subject} from '../../../../node_modules/rxjs';
import {takeUntil} from '../../../../node_modules/rxjs/operators';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    animations: [trigger('rowsAnimation', [transition('void => *', [
                style({height: '*', opacity: '0', transform: 'translateX(-550px)', 'box-shadow': 'none'}),
                sequence([
                    animate('.65s ease', style({height: '*', opacity: '.2', transform: 'translateX(0)', 'box-shadow': 'none'})),
                    animate('.65s ease', style({height: '*', opacity: 1, transform: 'translateX(0)'}))
                ])
            ])])]
})
export class HomeComponent implements OnInit {
    step: number;
    departureCountry: string;
    Prefixs = ['Mr', 'Mrs', 'Miss', 'Infant', 'Child'];
    TripTypes = [
        {
            'type': 'One Way',
            'value': 1
        }, {
            'type': 'Two Way',
            'value': 2
        }
    ];
    maxDate = new Date(Date.now());
    tommorow = new Date(Date.now());
    returnMinDt = new Date(Date.now());
    twoWay = false;
    public uploader: FileUploader = new FileUploader({
        url: AppConfig.endpoints.ticket + 'UploadPassport',
        itemAlias: 'photo'
    });
    airports: Array < Airport >;
    departureAirports: Array < Airport >;
    userform: FormGroup;
    public airportFilterCtrl: FormControl = new FormControl();
    public filteredairport: ReplaySubject < Airport[] > = new ReplaySubject < Airport[] > (1);
    private _onDestroy = new Subject < void > ();
    tkt: Ticket;
    tickets: Array < Ticketdetails >;
    matcher = new MyErrorStateMatcher();
    constructor(private _formBuilder: FormBuilder, private snackbar: MatSnackBar, private _homeService: HomeService) {
        this.formInit();
        this.setDate();
    }
    ngOnInit() {
        this.uploader.onAfterAddingFile = (file) => {
            file.withCredentials = false;
        };

        // let x = new Ticketdetails();
        // x.FirstName = 'Vibin';
        // x.FamilyName = 'Valsalan';
        // x.DestinationAirport = 'Cochin International Airport';

        // this.tickets = new Array < Ticketdetails > ();
        // this
        //     .tickets
        //     .push(x);

        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            if (status !== 200) {
                this.showSnackBar('Error Occured while uploading.Try again', 3000);
            } else {
                this.setPassport(response);
                console.log(response);
            }
        };
        this
            .airportFilterCtrl
            .valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this.filterAirports();
            });
        this.step = 0;
        this.departureCountry = 'UNITED ARAB EMIRATES';
        this.airports = new Array < Airport > ();
        this.departureAirports = new Array < Airport > ();
        this
            ._homeService
            .GetAirportByCountry(this.departureCountry) //  departure country on init
            .subscribe(res => {
                console.log(res);
                this.departureAirports = res;
            });
    }
    emailDomainValidator(control: FormControl) {
        const email = control.value;
        if (email && email.indexOf('@') !== -1) {
            const [_,
                domain] = email.split('@');
            if (domain.toLowerCase() !== 'aramex.com') {
                return {
                    emailDomain: {
                        parsedDomain: domain
                    }
                };
            }
        }
        return;
    }
    print() {
        console.log(this.userform);
    }
    setStep(index: number) {
        this.step = index;
    }
    nextStep() {
        this.step++;
    }
    prevStep() {
        this.step--;
    }
    showSnackBar(message, delay) {
        this
            .snackbar
            .open(message, 'OK', {duration: delay});
    }
    setDate() {
        this
            .tommorow
            .setDate(this.maxDate.getDate() + 1);
        this.returnMinDt = this.tommorow;
        this
            .userform
            .controls
            .departuredt
            .setValue('');
        this
            .userform
            .controls
            .returndt
            .setValue('');
        if (this.userform.value.triptype.value === 2) {
            this.twoWay = true;
            this
                .userform
                .controls
                .returndt
                .setValidators(Validators.required);
        } else {
            this.twoWay = false;
            this
                .userform
                .controls
                .returndt
                .clearValidators();
        }
        this
            .userform
            .controls
            .returndt
            .updateValueAndValidity();
    }
    private filterAirports() {
        if (!this.airports) {
            return;
        }
        // get the search keyword
        let search = this.airportFilterCtrl.value;
        if (!search) {
            this
                .filteredairport
                .next(this.airports.slice());
            return;
        } else {
            search = search.toLowerCase();
        }
        // filter the airports
        this
            .filteredairport
            .next(this.airports.filter(airport => airport.AirportName.toLowerCase().indexOf(search) > -1));
    }
    checkAirports(country: string) {
        console.log(country);
        this
            ._homeService
            .GetAirportByCountry(country)
            .subscribe(res => {
                console.log(res);
                this.airports = res;
                this
                    .filteredairport
                    .next(this.airports.slice());
            });
    }
    checkCountry(sfid: string) {
        this
            .userform
            .controls
            .destinationCountry
            .setValue(null);
        this.airports = new Array < Airport > ();
        this
            ._homeService
            .GetUserDetails(sfid)
            .subscribe(res => {
                console.log(res);
                const country = res.filter(x => x.DataKey === 'DESTINATION_COUNTRY')[0];
                this
                    .userform
                    .controls
                    .destinationCountry
                    .setValue(country.DataValue);
                this.checkAirports(country.DataValue);
            }, error => {
                console.log(error);
                this.showSnackBar(error, 5000);
            });
    }
    setPassport(value: string) {
        this
            .userform
            .controls
            .passport
            .setValue(value);
    }

    getAge(dateString, prefix: string) {
      if (dateString !== undefined && dateString !== '') {
        const today = new Date();
        const birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        if (age < 2) {
          this
            .userform
            .controls
            .prefix
            .setValue('Infant');
        } else if (age < 12 && age >= 2) {
          this
            .userform
            .controls
            .prefix
            .setValue('Child');
        } else {
          if (prefix === 'Child' || prefix === 'Infant') {
            this
              .userform
              .controls
              .prefix
              .setValue('');
          } else {
            this
              .userform
              .controls
              .prefix
              .setValue(prefix);
          }
        }
        this.showSnackBar('Age is ' + age, 3000);
      }
    }
    setReturnMinDate(event: MatDatepickerInputEvent < Date >) {
        this.returnMinDt = event.value;
    }
    addRequest(userformdirective: FormGroupDirective) {
        if (this.userform.invalid) {
            this.showSnackBar('There are errors in the form , Please fill the required fields', 2000);
        } else {
            this.nextStep();
            console.log(this.userform);
            console.log(this.tkt);
            if (this.tickets === undefined) {
                this.tickets = new Array < Ticketdetails > ();
            }
            const tktDetail = new Ticketdetails();
            tktDetail.Email = this.userform.value.email;
            // tktDetail.Username
            tktDetail.TripType = this.userform.value.triptype.type;
            tktDetail.Prefix = this.userform.value.prefix;
            // tktDetail.Entityid =
            tktDetail.DateOfBirth = this.userform.value.dobdt;
            tktDetail.FirstName = this.userform.value.firstname;
            tktDetail.FamilyName = this.userform.value.lastname;
            tktDetail.DepartureCity = this.userform.value.departureCity.AirportCode + '|' + this.userform.value.departureCity.AirportName;
            tktDetail.DestinationCountry = this.userform.value.destinationCountry;
            tktDetail.DestinationAirport = this.userform.value.destinationAirport.AirportCode + '|'
            + this.userform.value.destinationAirport.AirportName;
            tktDetail.DepartureDate = this.userform.value.departuredt;
            tktDetail.ReturnDate = this.userform.value.returndt;
            tktDetail.DeparturePhone = this.userform.value.departurePhone;
            tktDetail.DestinationPhone = this.userform.value.destinationPhone;
            tktDetail.UploadedFile = this.userform.value.passport;
            tktDetail.EmployeeId = this.userform.value.sfid;
            tktDetail.Comment = this.userform.value.comment;
            this.tickets.push(tktDetail);
            userformdirective.resetForm();
            this.userform.reset();
            this.twoWay = false;
            console.log(this.tickets);
        }
    }
    formInit() {
      this.userform = this
        ._formBuilder
        .group({
          prefix: [
            '', Validators.required
          ],
          firstname: [
            '', [
              Validators.required
            ]
          ],
          lastname: [
            '', Validators.required
          ],
          dobdt: [
            '', Validators.required
          ],
          departuredt: [
            '', Validators.required
          ],
          returndt: [''],
          email: [
            ' ', [
              Validators.required, Validators.pattern('[^ @]*@[^ @]*'),
              this.emailDomainValidator
            ]
          ],
          sfid: ['', Validators.required],
          triptype: [
            '', Validators.required
          ],
          departureCity: [
            '', Validators.required
          ],
          destinationCountry: [, Validators.required],
          destinationAirport: [''],
          departurePhone: [, Validators.required],
          destinationPhone: [],
          comment: [],
          passport: [, Validators.required]
        });
    }

    sendApproval() {
        this._homeService.PostTicketRequest(this.tickets).subscribe(res => {
            console.log(res);
            this.showSnackBar('Ticket created successfully ' + res, 5000);
            this.tickets = new Array < Ticketdetails > ();
        }, error => {
            console.log(error);
            this.showSnackBar(error, 5000);
        });
    }

    removePassenger(i) {
        if (this.tickets !== undefined) {
            this
                .tickets
                .splice(i, 1);
        } else {
            this.showSnackBar('Invalid remove opertaion ', 3000);
        }
    }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}
