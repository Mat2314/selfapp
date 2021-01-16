import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test form validity', () => {
    const form = component.registrationForm;
    expect(form.valid).toBeFalsy();

    const button = fixture.debugElement.query(By.css("button[type=submit]"));
    expect(button.nativeElement.disabled).toBeTruthy();

    const first_name = form.controls.first_name;
    const last_name = form.controls.last_name;
    const email = form.controls.email;
    const password = form.controls.password;
    const repeat_password = form.controls.repeat_password;

    first_name.setValue('John');
    last_name.setValue('Peter');
    email.setValue('johnpeter@johnpeter.com');
    password.setValue('123123123');
    repeat_password.setValue('123123123');

    fixture.detectChanges();

    expect(form.valid).toBeTruthy();
    expect(button.nativeElement.disabled).toBeFalsy();

  });

  it('should test password validity', () => {
    const form = component.registrationForm;
    const first_name = form.controls.first_name;
    const last_name = form.controls.last_name;
    const email = form.controls.email;
    const password = form.controls.password;
    const repeat_password = form.controls.repeat_password;

    first_name.setValue('John');
    last_name.setValue('Peter');
    email.setValue('johnpeter@johnpeter.com');
    password.setValue('123');
    repeat_password.setValue('123');

    fixture.detectChanges();
    expect(form.valid).toBeFalsy();

    password.setValue('123456789');
    repeat_password.setValue('123123123');

    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css("button[type=submit]"));
    expect(button.nativeElement.disabled).toBeTruthy();

  });
});
