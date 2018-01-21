import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
  providers: [FormBuilder]
})
export class RegisterUserComponent {

  form: FormGroup;

  username: AbstractControl;
  email: AbstractControl;
  password: AbstractControl;
  confirmPassword: AbstractControl;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      'username': new FormControl('', {
        validators: [Validators.required, Validators.minLength(8)],
        updateOn: 'blur'
      }),
      'email': new FormControl('', {
        validators: [Validators.required, Validators.pattern('[^ @]*@[^ @]*')],
        updateOn: 'blur'
      }),
      'password': new FormControl('',
        {
          validators: [Validators.minLength(8), Validators.required],
          updateOn: 'blur'
        }),
      'confirmPassword': new FormControl('', {
        validators: [ValidationService.MatchPassword],
        updateOn: 'blur'
      })
    },
      {
        validator: ValidationService.MatchPassword
      });

    this.username = this.form.controls['username'];
    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
    this.confirmPassword = this.form.controls['confirmPassword'];

  }

  onSubmit() {
    console.log(this.form);
    if (this.form.valid) {
      console.log('Form Submitted!');
      this.form.reset();
    }
  }

}
