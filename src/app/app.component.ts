import { Component } from '@angular/core';
import { Usuario } from './models/usuario';
import { apiAuthService } from './services/apiAuth.Service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  drawer: any;
  usuario!: Usuario

  constructor(
    public _apiAuthServiceLog: apiAuthService,
    private _router: Router
  ){
    this._apiAuthServiceLog.user.subscribe(response => {
      this.usuario = response
    })
  }
  logout() {
    this._apiAuthServiceLog.logout()
    this._router.navigate(['/login'])
  }
}
