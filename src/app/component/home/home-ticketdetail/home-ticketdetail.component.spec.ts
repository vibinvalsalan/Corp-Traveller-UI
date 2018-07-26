import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTicketdetailComponent } from './home-ticketdetail.component';

describe('HomeTicketdetailComponent', () => {
  let component: HomeTicketdetailComponent;
  let fixture: ComponentFixture<HomeTicketdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTicketdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTicketdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
