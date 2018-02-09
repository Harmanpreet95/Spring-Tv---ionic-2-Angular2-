 import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,App} from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import {LoadingController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import { ToastController } from 'ionic-angular';
import {CommonProvider} from '../../providers/common/common';
import { LogoutPage } from '../logout/logout';

/**
 * Generated class for the ChangepasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {
    public Loading=this.loadingCtrl.create({
    content: 'Please wait...'
    
  });
 public data='';
  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   public common : CommonProvider,
   public http:Http,
   private toastCtrl: ToastController, public loadingCtrl:LoadingController,public app:App, public menu: MenuController) {
    this.menu.swipeEnable(false);
  	var user_id = localStorage.getItem('USERID');
    console.log(user_id);
  }
  changepassword(form){
    this.Loading.present();
    console.log(form);
 console.log(form.value.password);
	// alert("changing password");
var User = localStorage.getItem("USERID");
var Useremail = localStorage.getItem("USER_EMAIL");
console.log(User)

if (form.value.newpassword == form.value.conpassword) {
 var data ={
        id: User,
        email:Useremail, // old
        new_password : form.value.newpassword,  // new
      	confirm: form.value.conpassword // retype
}
 console.log(data);
var Serialized = this.serializeObj(data);
console.log(Serialized);
 console.log(this.common.options);
var optionss = this.common.options;
 this.http.post(this.common.base_url +'change_password_app', Serialized, optionss).map(res=>res.json()).subscribe(data=>{
    console.log(data);
this.Loading.dismiss();
if(data.error == 0){
  let toast = this.toastCtrl.create({
    message: data.data.message,
    duration: 3000,
    position: 'middle'
  });
  toast.present();
  this.navCtrl.push(LogoutPage);
	
 
}else{
     let toast = this.toastCtrl.create({
     message: data.data.message,
     duration: 3000,
     position: 'middle'
  });
     toast.present();
  
}
   
   })
}else{
  let toast = this.toastCtrl.create({
    message: "Passwords do not match",
    duration: 3000,
    position: 'middle'
  });
  toast.present();
  //alert("Passwords do not match");
}
}
serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetpasswordPage');
  }
// logout()
//  {
//  this.app.getRootNav().setRoot(LogoutPage);
//  } 

}
