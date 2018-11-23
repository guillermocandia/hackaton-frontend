import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';

import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

import { MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material';
import { Sort } from '@angular/material';
import { MatPaginator } from '@angular/material';
import { PageEvent } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import { MatDialog } from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

import { PatientService } from '../_services/index';

import { Patient } from '../_model/index';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html'
})
export class PatientComponent implements OnInit {
  patients: Patient[];

  displayedColumns = ['id', 'name', 'actions'];
  dataSource = new MatTableDataSource(this.patients);

  constructor(
    private _patientService: PatientService,
    private _fb: FormBuilder,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    console.log(`${this.constructor.name}: ngOnInit`);
    this.getPatients();
  }


  getPatients() {
    this._patientService.getAll()
    .subscribe(
      data => {
        this.patients = data;
        this.dataSource = new MatTableDataSource(this.patients);
      }
    );
  }

}
