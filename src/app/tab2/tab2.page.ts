import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';

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
    await this.photoService.loadSaved();
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
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
