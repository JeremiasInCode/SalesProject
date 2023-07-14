import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { JwtInterceptor } from './security/jwt.interceptor';

import { HomeComponent } from './home/home.component';
import { ClienteComponent } from './cliente/cliente.component';
import { DialogClienteComponent } from './cliente/dialog/DialogCliente.Component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DialogDeleteComponent } from './common/delete/DialogDelete.Component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule} from '@angular/material/table'
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms' // ng moduls
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClienteComponent,
    DialogClienteComponent,
    DialogDeleteComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    HttpClientModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatCardModule,
    FormsModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
