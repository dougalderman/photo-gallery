import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';

import { Photo } from '@capacitor/camera';

import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  modal: HTMLIonModalElement;

  constructor(
    public photoService: PhotoService,
    public modalController: ModalController
  ) {}

  async ngOnInit() {
    await this.photoService.loadSaved()
      .then(
        (value: any) => {
          console.log('loadSaved photos resolve value', value);
        },
        (error: any) => {
          if (error && error.message) {
            if (error.message.search('File does not exist') !== -1) {
              console.log('File does not exist');
              this.photoService.deleteAllPhotos().then(() =>
                {
                  console.log('Load Saved Photos');
                  this.photoService.loadSaved();
                }
              );
            } 
          }
          else {
            console.log('loadSaved photos error value', error);
          }  
        }
      );
  }

  addPhotoToGallery() {
    this.photoService.callCamera()
      .then(
        (value: Photo) => {
          console.log('callCamera resolve value', value);
          if (value) {
            this.photoService.saveCameraPicture(value);
          }
        },
        (error: any) => {
          if (error && error.message) {
            if (error.message.search('User cancelled photos app') !== -1) {
              console.log('User cancelled photos app');
            }
            else {
              console.log('callCamera error value', error);
            }
          }    
        }
      );  
  }

  async deleteAllPhotosFromGallery() {
    this.presentModal().then(() =>
      { 
        this.modal.onWillDismiss().then((data:any) =>
          {
            console.log('data: ', data);
            if (data.data.deleteAll === true) {
              console.log('Delete all Photos')
              this.photoService.deleteAllPhotos().then(() =>
                {
                  console.log('Load Saved Photos');
                  this.photoService.loadSaved();
                }
              );
            } 
          }
        );
      }
    );    
  }

  async presentModal() {
    this.modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'modal-custom-class',
      componentProps: {
        'modalMessage': 'Are you sure that you want to delete all the pictures?',
        'buttonOneLabel': 'Yes',
        'buttonTwoLabel': 'No'
      }
    });
    return await this.modal.present();
  }
}
