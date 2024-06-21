import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantLoginComponent } from './tenant-login.component';

describe('TenantLoginComponent', () => {
  let component: TenantLoginComponent;
  let fixture: ComponentFixture<TenantLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
