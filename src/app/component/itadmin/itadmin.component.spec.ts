import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItadminComponent } from './itadmin.component';

describe('ItadminComponent', () => {
  let component: ItadminComponent;
  let fixture: ComponentFixture<ItadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
