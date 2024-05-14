import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthTempComponent } from './auth-temp.component';

describe('AuthTempComponent', () => {
  let component: AuthTempComponent;
  let fixture: ComponentFixture<AuthTempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthTempComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
