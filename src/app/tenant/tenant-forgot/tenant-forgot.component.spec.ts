import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantForgotComponent } from './tenant-forgot.component';

describe('TenantForgotComponent', () => {
  let component: TenantForgotComponent;
  let fixture: ComponentFixture<TenantForgotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantForgotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantForgotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
