import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

import { PatientService } from '../_services/index';

import { Patient } from '../_model/index';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
})
export class PatientDetailComponent implements OnInit {

  constructor(private _patientService: PatientService,
              private _fb: FormBuilder,
              private _location: Location,
              private _route: ActivatedRoute,
              private _snackBar: MatSnackBar) {}

  private patient: Patient;

  new = false;

  form = new FormGroup ({
    id: new FormControl(),
    name: new FormControl()
  });


  ngOnInit() {
    console.log(`${this.constructor.name}: ngOnInit`);
    this.createForm();
    this.getPatient();
  }


  createForm() {
    this.form = this._fb.group({
      id: [''],
      name: ['', [Validators.required] ]
    });
  }


  get id() { return this.form.get('id'); }
  get name() { return this.form.get('name'); }

  getPatient(): void {
    const id = this._route.snapshot.paramMap.get('id');
    if (id === 'new') {
      this.patient = new Patient();
      this.new = true;
      return;
    }
    this._patientService.get(Number(id))
    .subscribe(
      data => {
        this.patient = data;
        this.id.setValue(data.id);
        this.name.setValue(data.name);
      }
    );
  }


  save(): void {
    this.patient.name = this.name.value;
    this._patientService.save(this.patient)
    .subscribe(
      (data: Patient|any) => {
        this.patient = data;
        this._snackBar.open('Paciente guardado', '', {
          duration: 3000,
          panelClass: 'snackBar-success'
        });
        this.new = false;
      }
    );
  }


}
