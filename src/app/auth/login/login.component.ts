import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: any;
  errors: any[] = [];
  constructor(private FormBuilder: FormBuilder, private AuthService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('route', this.route);
    this.formInit();

    // this.route.params
  }

  formInit() {
    this.loginForm = this.FormBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$')]],
      password: ['', Validators.required]
    });
  }

  isValidForm(field) {
    return this.loginForm.controls[field].invalid && (this.loginForm.controls[field].dirty || this.loginForm.controls[field].touched);
  }

  isRequired(field) {
    return this.loginForm.controls[field].errors.required;
  }

  login() {
    this.AuthService.login(this.loginForm.value)
    .subscribe(
      (data) => {
        this.router.navigate(['/rentals']);
      },
      (err) => {
        this.errors.push(err.error.msg);
      }
    )
  }
}
