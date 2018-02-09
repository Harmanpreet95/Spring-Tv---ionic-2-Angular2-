import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { SigninPage } from '../signin/signin';
import 'rxjs/add/operator/map';
import {LoadingController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import { ToastController } from 'ionic-angular';
import {CommonProvider} from '../../providers/common/common';


/**
 * Generated class for the ForgetpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-forgetpassword',
  templateUrl: 'forgetpassword.html',
})
export class ForgetpasswordPage {
    public Loading=this.loadingCtrl.create({
    content: 'Please wait...'
    
  });
public data=" ";
   constructor(public navCtrl: NavController,
   public navParams: NavParams,
   public http:Http,
  public common : CommonProvider,
   public loadingCtrl:LoadingController,
   private toastCtrl: ToastController, public menu: MenuController) {
    this.menu.swipeEnable(false);
     
  }
 forgot(form){ 
  //  alert('start');
  this.Loading.present();
 console.log(data);
console.log(this.common.options);
 var data ={
  email: form.value.email
}
 var Serialized = this.serializeObj(data);

var optionss = this.common.options;
 this.http.post(this.common.base_url +'forgetpass', Serialized, optionss).map(res=>res.json()).subscribe(data=>{	
   this.Loading.dismiss();
if(data.error == 0){
 this.data = data;
   console.log(this.data);
   let toast = this.toastCtrl.create({
    message: data.message,
    duration: 3000,
    position: 'middle'
  });
  toast.present();
   //alert(data.msg);
   
   this.navCtrl.push(SigninPage);
}else{
  let toast = this.toastCtrl.create({
    message: data.message,
    duration: 3000,
    position: 'middle'
  });
  toast.present();
 // alert(data.msg);
}
 })
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
  
signin()
 {
 	this.navCtrl.push(SigninPage);
 }

}
