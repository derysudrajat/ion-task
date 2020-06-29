import * as firebase from 'Firebase';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  ref = firebase.database().ref('infos/');
  infoForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) { 
    this.infoForm = this.formBuilder.group({
      'info_title' : [null, Validators.required],
      'info_description' : [null, Validators.required]
    });
  }

  saveInfo() {
    let newInfo = firebase.database().ref('infos/').push();
    newInfo.set(this.infoForm.value);
    this.router.navigate(['/detail/'+newInfo.key]);
  }

  ngOnInit() {
  }

}
