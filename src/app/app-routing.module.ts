import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './_services/index';

import { LoginComponent } from './login/index';
import { LogoutComponent } from './login/index';

const routes: Routes = [
  { path: 'login',
    component: LoginComponent },
  { path: 'logout',
    component: LogoutComponent },

  // { path: 'test',
  //   component: TestComponent, canActivate: [AuthGuard] },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
