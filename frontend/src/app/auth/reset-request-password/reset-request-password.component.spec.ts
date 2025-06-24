import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetRequestPasswordComponent } from './reset-request-password.component';

describe('ResetRequestPasswordComponent', () => {
  let component: ResetRequestPasswordComponent;
  let fixture: ComponentFixture<ResetRequestPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResetRequestPasswordComponent]
    });
    fixture = TestBed.createComponent(ResetRequestPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
