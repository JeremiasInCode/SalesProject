import { Component, OnInit } from "@angular/core";
import { apiAuthService } from "../services/apiAuth.Service";
import { Route, Router } from "@angular/router";
import { Login } from "../models/login";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {

  public loginForm = this._formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(public _apiAuthService: apiAuthService,
    private router: Router,
    private _formBuilder: FormBuilder
  )
  {
    
  }
  
  ngOnInit() { 
  
  }

  login() {
    const { email, password } = this.loginForm.value;
    console.log(this.loginForm.value)
    if (email && password) {
      const loginData: Login = {
        email: email,
        password: password
      };
      this._apiAuthService.login(loginData).subscribe(element => {
        if (element.success === 1) {
          this.router.navigate(['/']);
        }
      });
    }
  }

}