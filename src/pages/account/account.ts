import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events,App } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { SubscribePage } from '../subscribe/subscribe';
import { LogoutPage } from '../logout/logout';
import { HomePage } from '../home/home';
import { SerialsPage } from '../serials/serials';
import {LoadingController} from 'ionic-angular';
import {CommonProvider} from '../../providers/common/common';
import { SigninPage } from '../signin/signin';
import { TabsPage } from '../tabs/tabs';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { AboutusPage } from "../aboutus/aboutus";
import { PrivacypolicyPage } from "../privacypolicy/privacypolicy";
import { TermsandconditionsPage } from "../termsandconditions/termsandconditions";
import { Facebook } from "@ionic-native/facebook";

/**
 * Generated class for the  AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  userphone: any;
 public User='';
  contact: string;
public Loading=this.loadingCtrl.create({
    content: 'Please wait...'
    
  });
  constructor(public navCtrl: NavController,public events:Events,
                public navParams: NavParams,private fb: Facebook,
                public http:Http, public common : CommonProvider,public loadingCtrl:LoadingController,public app: App, public menu: MenuController) {
    this.menu.swipeEnable(false);
this.events.subscribe("myEvent",(data) => {
  console.log(data);
  
this.show_details();

// do something

});
                  
  
       console.log(localStorage.getItem("FBID"));
       this.contact = localStorage.getItem("FBID");
       console.log(this.contact);
this.show_details();
  } 
show_details(){
this.Loading.present();
    var User = localStorage.getItem("USERID");
    console.log(User)

    var data = {
      id :User,
     
    }
    console.log(this.common.options);
var optionss = this.common.options;

    var Serialized = this.serializeObj(data);
    console.log(Serialized);
    
    this.http.post(this.common.base_url +'fetchuserdeatils', Serialized, optionss).map(res=>res.json()).subscribe(data=>{
    console.log(data);
    this.Loading.dismiss();
      if(data.error == 0){

    
    this.userphone = data.data.phone;
    

     console.log(this.userphone);
  //       let toast = this.toastCtrl.create({
  //   message: data.message,
  //   duration: 3000,
  //   position: 'middle'
  // });
  //  toast.present();
      
     

      }else{
        //alert(data.message);
  //       let toast = this.toastCtrl.create({
  //   message: data.message,
  //   duration: 3000,
  //   position: 'middle'
  // });
  //  toast.present();
      }

    })}
serializeObj(obj) {
            var result = [];
            for (var property in obj)
              result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

            return result.join("&");
          }
  subscribe()
 {
 	this.navCtrl.push(SubscribePage);
 }
movtoacc(){
  this.navCtrl.push(LogoutPage);
}
 logut(){
    if(this.contact!= null){
      this.fb.logout().then((sucess) => {
      localStorage.clear();
    this.app.getRootNav().setRoot(SigninPage);
    
    }).catch((error) => {
     // alert(error);
       console.log(error)
    })
    }else{
    localStorage.clear();
    // this.navCtrl.setRoot(SigninPage);
    this.app.getRootNav().setRoot(SigninPage);
  }
}
home()
 {
 	this.navCtrl.push(HomePage);
 } 

 movies_lst()
 {
 	this.navCtrl.push(TabsPage);
  
 }  
 aboutus(){
    this.navCtrl.push(AboutusPage);
  }
  termsandcndtn(){
    this.navCtrl.push(TermsandconditionsPage);
  }
  pricypolicy(){
    this.navCtrl.push(PrivacypolicyPage);
}
}

