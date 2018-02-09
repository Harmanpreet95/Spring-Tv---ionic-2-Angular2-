import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { PymntplanPage } from '../pymntplan/pymntplan';



/**
 * Generated class for the SerialssubscribePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-serialssubscribe',
  templateUrl: 'serialssubscribe.html'
})
export class SerialssubscribePage {

  constructor(public navCtrl: NavController, public menu: MenuController) {
    this.menu.swipeEnable(false);

  }
 pymnt()
 {
 	this.navCtrl.push(PymntplanPage);
 } 

 

 
}

