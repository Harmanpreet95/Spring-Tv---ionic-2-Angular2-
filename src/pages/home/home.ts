import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { SigninPage } from '../signin/signin';
import { SignupPage } from '../signup/signup';

import { TabsPage } from '../tabs/tabs';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  User: string;

  constructor(public navCtrl: NavController, public menu: MenuController) {
    this.menu.swipeEnable(false);
        if(localStorage.getItem('USERID') != null){
          this.navCtrl.push(TabsPage);
        }
  }
 submit(){
 	this.navCtrl.push(SigninPage);
 }

 signup()
 {
 	this.navCtrl.push(SignupPage);
 } 

 
}
