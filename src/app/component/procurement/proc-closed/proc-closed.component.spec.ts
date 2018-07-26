import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcClosedComponent } from './proc-closed.component';

describe('ProcClosedComponent', () => {
  let component: ProcClosedComponent;
  let fixture: ComponentFixture<ProcClosedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcClosedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcClosedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
