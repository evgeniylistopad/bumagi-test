import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/toast/toast.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  inputType: string = 'password';
  loading = false;
  submitted = false;
  error = '';

  constructor(public authService: AuthService, public router: Router, public toastService: ToastService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      "login": new FormControl("test@example.com", [Validators.required, Validators.email]),
      "password": new FormControl("1q2w3e", Validators.required)
    })
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    const login = this.f.login.value
    const password = this.f.password.value
    this.authService.login(login, password).subscribe(
      (user) => {
        this.router.navigate(['/dashboard']);
      },
      (err) => {
        this.toastService.show({text:err});
      }
    )

  }

  changeInputType() {
    if (this.inputType == 'text') this.inputType = 'password'
    else this.inputType = 'text'
  }

  getScrIcon() {
    if (this.inputType == 'text') return 'assets/eyeHide.svg'
    else return 'assets/eyeShow.svg'
  }
}
