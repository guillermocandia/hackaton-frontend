import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './_services/index';

import { LoginComponent } from './login/index';
import { LogoutComponent } from './login/index';

import { PatientComponent } from './patient/index';
import { PatientDetailComponent } from './patient/index';

import { MedicalRecordDetailComponent } from './medical-record/index';

const routes: Routes = [
  { path: 'login',
    component: LoginComponent },
  { path: 'logout',
    component: LogoutComponent },

  { path: 'patients',
    component: PatientComponent, canActivate: [AuthGuard] },
  { path: 'patients/:id',
    component: PatientDetailComponent, canActivate: [AuthGuard] },

  { path: 'medical-records/:id',
    component: MedicalRecordDetailComponent, canActivate: [AuthGuard] },

  { path: '', redirectTo: '/patients', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
