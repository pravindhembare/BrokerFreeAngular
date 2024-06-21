import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPropertyTenantComponent } from './view-property-tenant.component';

describe('ViewPropertyTenantComponent', () => {
  let component: ViewPropertyTenantComponent;
  let fixture: ComponentFixture<ViewPropertyTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPropertyTenantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPropertyTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
