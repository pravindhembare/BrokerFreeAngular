import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerLogin1Component } from './owner-login1.component';

describe('OwnerLogin1Component', () => {
  let component: OwnerLogin1Component;
  let fixture: ComponentFixture<OwnerLogin1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerLogin1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerLogin1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
