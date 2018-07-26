import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcCancelledComponent } from './proc-cancelled.component';

describe('ProcCancelledComponent', () => {
  let component: ProcCancelledComponent;
  let fixture: ComponentFixture<ProcCancelledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcCancelledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcCancelledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
