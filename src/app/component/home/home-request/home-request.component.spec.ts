import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRequestComponent } from './home-request.component';

describe('HomeRequestComponent', () => {
  let component: HomeRequestComponent;
  let fixture: ComponentFixture<HomeRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
