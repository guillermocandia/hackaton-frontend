import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

import { UserLogin } from '../_model/index';

import { AuthService } from '../_services/index';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
})
export class LogoutComponent implements OnInit {

  constructor(
    private _authService: AuthService,
  ) {}


  ngOnInit() {
    console.log(`${this.constructor.name}: ngOnInit`);
    this._authService.logout();
  }

}
