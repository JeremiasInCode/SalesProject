import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router"
import { apiAuthService } from "../services/apiAuth.Service";

@Injectable({ providedIn: 'root'})
export class AuthGaurd implements CanActivate {
    
    constructor(
      private router: Router,
      private authServiceUser: apiAuthService
    ) 
    {
      
    }

    canActivate(route: ActivatedRouteSnapshot) {
      const usuario = this.authServiceUser.usuarioData
      if (usuario) return true;
      this.router.navigate(['/'])
      return false
    }
}