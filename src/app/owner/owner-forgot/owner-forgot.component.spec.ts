import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerForgotComponent } from './owner-forgot.component';

describe('OwnerForgotComponent', () => {
  let component: OwnerForgotComponent;
  let fixture: ComponentFixture<OwnerForgotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerForgotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerForgotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
