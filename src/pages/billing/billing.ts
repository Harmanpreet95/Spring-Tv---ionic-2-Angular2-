import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { BillingaddressPage } from '../billingaddress/billingaddress';

@Component({
  selector: 'page-billing',
  templateUrl: 'billing.html'
})
export class BillingPage {

  constructor(public navCtrl: NavController, public menu: MenuController) {
    this.menu.swipeEnable(false);

  }

   payment(){
 	this.navCtrl.push(BillingaddressPage);
 }
 


}