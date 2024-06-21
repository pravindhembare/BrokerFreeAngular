import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerRegister1Component } from './owner-register1.component';

describe('OwnerRegister1Component', () => {
  let component: OwnerRegister1Component;
  let fixture: ComponentFixture<OwnerRegister1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerRegister1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerRegister1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
