import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetWorkdaysModalComponent } from './set-workdays-modal.component';

describe('SetWorkdaysModalComponent', () => {
  let component: SetWorkdaysModalComponent;
  let fixture: ComponentFixture<SetWorkdaysModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetWorkdaysModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetWorkdaysModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
