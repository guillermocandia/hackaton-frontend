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
import { StateService } from '../_services/index';
import { CategorizationService } from '../_services/index';
import { MedicalRecordService } from '../_services/index';

import { Patient } from '../_model/index';
import { State } from '../_model/index';
import { Categorization } from '../_model/index';
import { MedicalRecord } from '../_model/index';

@Component({
  selector: 'app-medical-record-detail',
  templateUrl: './medical-record-detail.component.html',
})
export class MedicalRecordDetailComponent implements OnInit {

  constructor(private _patientService: PatientService,
              private _stateService: StateService,
              private _categorizationService: CategorizationService,
              private _medicalRecordService: MedicalRecordService,
              private _fb: FormBuilder,
              private _location: Location,
              private _route: ActivatedRoute,
              private _snackBar: MatSnackBar) {}

  private medicalRecord: MedicalRecord;

  new = false;

  form = new FormGroup ({
    id: new FormControl(),
    patient: new FormControl(),
    categorization: new FormControl(),
    state: new FormControl(),
    comment: new FormControl()
  });


  ngOnInit() {
    console.log(`${this.constructor.name}: ngOnInit`);
    this.createForm();
    this.getMedicalRecord();
  }


  createForm() {
    this.form = this._fb.group({
      id: [''],
      patient: ['', [Validators.required] ],
      categorization: ['', [Validators.required] ],
      state: ['', [Validators.required] ],
      comment: ['']
    });
  }


  get id() { return this.form.get('id'); }
  get patient() { return this.form.get('patient'); }
  get categorization() { return this.form.get('categorization'); }
  get state() { return this.form.get('state'); }
  get comment() { return this.form.get('comment'); }

  getMedicalRecord(): void {
    const id = this._route.snapshot.paramMap.get('id');
    if (id === 'new') {
      this.medicalRecord = new MedicalRecord();
      this.new = true;
      return;
    }
    this._medicalRecordService.get(Number(id))
    .subscribe(
      data => {
        this.medicalRecord = data;
        this.id.setValue(data.id);
        this.patient.setValue(data.patient);
        this.categorization.setValue(data.categorization);
        this.state.setValue(data.state);
        this.comment.setValue(data.comment);
      }
    );
  }


  // save(): void {
  //   this.medicalRecord.name = this.name.value;
  //   this._patientService.save(this.medicalRecord)
  //   .subscribe(
  //     (data: MedicalRecord|any) => {
  //       this.medicalRecord = data;
  //       this._snackBar.open('Paciente guardado', '', {
  //         duration: 3000,
  //         panelClass: 'snackBar-success'
  //       });
  //       this.new = false;
  //     }
  //   );
  // }


}
