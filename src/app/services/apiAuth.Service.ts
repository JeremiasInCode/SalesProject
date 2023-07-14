import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map, filter, tap } from "rxjs";
import { Response } from "../models/response";
import { Usuario } from "../models/usuario";
import { Login } from "../models/login";

@Injectable({ 
  providedIn: 'root' 
})

export class apiAuthService {
  url: string = "https://localhost:7145/api/User/login"
  
  /*
  ! BehaviorSubject: Can receive a element since its creation.
  ! Subject: cannot.
  */
  private userSubject: BehaviorSubject<Usuario>
  //! property to get.
  public get usuarioData() : Usuario {
    return this.userSubject.value
  }

  constructor(private _http: HttpClient) {
    const storedUser = localStorage.getItem('usuario')
    const InitialUser = storedUser ? JSON.parse(storedUser) : null
    this.userSubject = new BehaviorSubject<Usuario>(InitialUser)
  }

  login(login: Login) : Observable<Response> {
    const httpOption = {
      headers: new HttpHeaders({
        'Contend-Type': 'application/json'
      })
    };
    //! Verify if i have to save the session.
    return this._http.post<Response>(this.url, login, httpOption)
    .pipe(
      map(element => {
        if (element.success === 1) {
          const userData: Usuario = element.data;
          localStorage.setItem('usuario', JSON.stringify({
            userData,
          }))
          this.userSubject.next(userData) //! next() - hacmeos saber a todas las suscripciones que se actualizo.
        }
        return element
      })
    )
  }

  logout() {
    localStorage.removeItem('usuario')
    this.userSubject.next({} as Usuario)
  }
}
