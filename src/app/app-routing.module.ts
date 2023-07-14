import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClienteComponent } from './cliente/cliente.component';
import { AuthGaurd } from './security/auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [ AuthGaurd ] },
  { path: 'cliente', component: ClienteComponent, canActivate: [ AuthGaurd ] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
