import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcPendingComponent } from './proc-pending.component';

describe('ProcPendingComponent', () => {
  let component: ProcPendingComponent;
  let fixture: ComponentFixture<ProcPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
