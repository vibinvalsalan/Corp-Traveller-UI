import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  constructor(private _authService: AuthService) {
    // this._authService.GetRole();
    // sessionStorage.setItem('userRoles', 'Admin');
  }

  ngOnInit() {
    this._authService.GetRole().subscribe(res => {
    }, (error) => {});
  }
}
