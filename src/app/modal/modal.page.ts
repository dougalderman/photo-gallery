import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @Input() modalMessage: string;
  @Input() buttonOneLabel: string;
  @Input() buttonTwoLabel: string;

  constructor(
    public modalController: ModalController
  ) {}

  ngOnInit() {
  }

  dismiss(deleteAll: boolean) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'deleteAll': deleteAll,
    });
  }
}
