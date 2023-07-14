import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { apiAuthService } from "../services/apiAuth.Service";
import { Observable } from "rxjs";


@Injectable({ providedIn: 'root'})
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private _apiAuthService: apiAuthService
  ) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler):
  Observable<HttpEvent<any>> {
    const usuario = this._apiAuthService.usuarioData;
    if (usuario){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${usuario.token}`
        }
      });
    }
    return next.handle(request)
  }
}
