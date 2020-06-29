import { Component } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'Firebase';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  infos = [];
  ref = firebase.database().ref('infos/');
  constructor(public router: Router, public loadingController: LoadingController, public alertController: AlertController) {
    this.ref.on('value', resp => {
      this.infos = [];
      this.infos = snapshotToArray(resp);
    });
  }

  addInfo() {
    this.router.navigate(['/add-info']);
  }

  edit(key) {
    this.router.navigate(['/edit/' + key]);
  }

  async delete(key) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure want to delete this task?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('cancel');
          }
        }, {
          text: 'Okay',
          handler: () => {
            firebase.database().ref('infos/' + key).remove();
          }
        }
      ]
    });

    await alert.present();
  }

}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};
