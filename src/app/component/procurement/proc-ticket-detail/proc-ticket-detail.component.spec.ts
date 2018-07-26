import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcTicketDetailComponent } from './proc-ticket-detail.component';

describe('ProcTicketDetailComponent', () => {
  let component: ProcTicketDetailComponent;
  let fixture: ComponentFixture<ProcTicketDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcTicketDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcTicketDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
