import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { SerialsPage } from '../serials/serials';
import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';
import { ForgetpasswordPage } from '../forgetpassword/forgetpassword';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {CommonProvider} from '../../providers/common/common';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
import { ToastController } from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})



export class SigninPage {
    public Loading=this.loadingCtrl.create({
    content: 'Please wait...'
    
  });
  facebook_data: string;
  profilepicface: string;
  public data = '';

  constructor(public navCtrl: NavController,
				public navParams: NavParams,
        public http:Http,
        public common : CommonProvider,
        private fb: Facebook,public nativeStorage: NativeStorage, public app: App,private toastCtrl: ToastController, public loadingCtrl:LoadingController, public menu: MenuController) {
    this.menu.swipeEnable(false);
 

         
  }
        

 submit(){
  //  this.navCtrl.push(SigninPage);
    this.app.getRootNav().setRoot(SigninPage);
 }

 signin_form(signin){
  	
this.Loading.present();

var data={
  email:signin.value.email,
  password:signin.value.password,
}
//alert(JSON.stringify(data))
var Serialized = this.serializeObj(data);
console.log(this.common.options);
var optionss = this.common.options;
this.http.post(this.common.base_url +'users/login', Serialized, optionss).map(res=>res.json()).subscribe(data=>{
    console.log(data);
    this.Loading.dismiss();
    if(data.error == 0){
      //alert(data.msg);
      console.log(data);
      console.log(data.user.id)
     
      
      let toast = this.toastCtrl.create({
    message: data.message,
    duration: 3000,
    position: 'middle'
  });
   toast.present();
     localStorage.setItem('USERID',data.user.id);
      localStorage.setItem('RANDOM',data.data);
      localStorage.setItem('USER_DATA',data.user);
      localStorage.setItem('USER_EMAIL',data.user.email);
      // this.navCtrl.push(TabsPage); 
       this.app.getRootNav().setRoot(TabsPage);
    }else{
      //alert(data.msg)
      let toast = this.toastCtrl.create({
    message: data.message,
    duration: 3000,
    position: 'middle'
  });
   toast.present();
    }
  },err => {
       this.Loading.dismiss();
     let toast = this.toastCtrl.create({
    message: "Invalid Credentials",
    duration: 3000,
    position: 'middle'
  });
   toast.present();
  })
  
} 
serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }

 facebook(){
  // alert('facebook');
  this.Loading.present();
    let permissions = new Array<string>();
    let nav = this.navCtrl;

    //the permissions your facebook app needs from the user
    permissions = ['public_profile', 'user_friends', 'email'];

    this.fb.login(permissions)
    .then((response) => {
      // alert("response");
      // alert(response);
      //  alert(JSON.stringify(response));
      let userId = response.authResponse.userID;
      let params = new Array<string>();

      //Getting name and gender properties
      this.fb.api("/me?fields=id,email,name,birthday,locale,age_range,gender,first_name,last_name,picture", params)
      .then((user) => {
        // alert("user");
        // alert(user);
        // alert(JSON.stringify(user));
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        //now we have the users info, let's save it in the NativeStorage
        this.nativeStorage.setItem('user',
        {
          email: user.email,
          username: user.name,
          image: user.picture
        })

        .then(() => {
          // alert( user.email);
          var url: string = this.common.base_url + 'user_register_fb_app';
var fb_data = {
      username:user.name,
      role:"user",
      facebook_id:user.id,
      profile_picture:user.picture,
      email:user.email,
      phone : '',
      password : '12345'
     
}
    this.Loading.dismiss();
// alert(JSON.stringify(fb_data))
var Serialized = this.serializeObj(fb_data);
console.log(this.common.options);
var optionss = this.common.options;
this.http.post(url, Serialized, optionss).map(res=>res.json()).subscribe(data=>{
  // alert('data');
  // alert(JSON.stringify(data));
    console.log(data);
//     localStorage.setItem('USERID',data.data._id);
//      localStorage.setItem('FBdata',data.data);
//       localStorage.setItem('USER_EMAIL',data.data.email);
//     this.navCtrl.push(TabsPage); 
//     this.app.getRootNav().setRoot(TabsPage);
 if(data.error == 0){
        localStorage.setItem('USERID',data.data._id);
      localStorage.setItem('FBID',data.data._id);
      localStorage.setItem('RANDOM',data.data.random);
//      alert("rand"+ JSON.stringify(data.data.random));
       localStorage.setItem('USER_EMAIL',data.data.email);
        this.navCtrl.push(TabsPage);
       let toast = this.toastCtrl.create({
     message: data.message,
     duration: 3000,
     position: 'middle'
   });
    toast.present();
   
      
    
    
     }else{
       //alert(data.msg)
       let toast = this.toastCtrl.create({
     message: data.message,
     duration: 3000,
     position: 'middle'
   });
    toast.present();
     }
  })

     


        },(error) => {
          console.log(error);
        })
      })
    }, (error) => {
      console.log(error);
    });
  }







 signup()
 {
  //  this.navCtrl.push(SignupPage);
    this.app.getRootNav().setRoot(SignupPage);
 }
 frgt()
  {
  //  this.navCtrl.push(ForgetpasswordPage);
    this.app.getRootNav().setRoot(ForgetpasswordPage);
 }
}