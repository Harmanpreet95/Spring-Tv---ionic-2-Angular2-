import { Component } from '@angular/core';
import { IonicPage, NavController,Events, NavParams,App } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {CommonProvider} from '../../providers/common/common';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { SigninPage } from '../signin/signin';
import { ChangepasswordPage } from '../changepassword/changepassword';
import { ToastController } from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import { AccountPage } from '../account/account';
import { ActionSheetController } from 'ionic-angular';
/**
 * Generated class for the  LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html'
})
export class LogoutPage {
  fb_user: string;
  public Loading = this.loadingCtrl.create({
    content: 'Please wait...'
    
  });
  prfimage: string;
  image: any;
  profileimage: void;
  User: string;
  userphone: any;
  username: any;
  useremail: any;
  info: any;
  public data = '';

  constructor(public navCtrl: NavController,public events:Events,
    public navParams: NavParams,public http:Http,
    public common : CommonProvider,
     private camera: Camera, private toastCtrl: ToastController,public actionSheetCtrl: ActionSheetController, public loadingCtrl:LoadingController,public app: App, public menu: MenuController) {
    this.menu.swipeEnable(false);
           this.User = localStorage.getItem("USERID");
           this.fb_user = localStorage.getItem("FBID");
           console.log(this.fb_user);
           this.events.publish("myEvent","jk");
 this.show_details();
 
  }

accessGallery(){
  this.Loading.present();
    var User = localStorage.getItem("USERID");
    console.log(User);
    
    console.log(this.common.options);
var optionss = this.common.options;


    
     const options : CameraOptions = {
      quality: 15,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options) .then((imageData) => {
        this.prfimage = "data:image/jpeg;base64," + imageData;
        this.image=imageData;
        var data_img = {
             
              user_id :User,

               profile_picture :this.image
    }
           
    var Serialized = this.serializeObj(data_img);
    console.log(Serialized);
    this.http.post(this.common.base_url +'post_user_image_app', Serialized, optionss).map(res=>res.json()).subscribe(data=>{
    console.log(data);
   
    this.Loading.dismiss();
              if(data.error == 0){
                  let toast = this.toastCtrl.create({
                  message: data.message,
                  duration: 3000,
                  position: 'middle'
                });
            toast.present();
             
     this.data= data; 
    }
      });
      
      }, (err) => {
        console.log(err);
      });
}
   show_details(){
this.Loading.present();
    var User = localStorage.getItem("USERID");
    console.log(User)

    var data = {
      id :this.User,
      
    }
    console.log(this.common.options);
var optionss = this.common.options;

    var Serialized = this.serializeObj(data);
    console.log(Serialized);
    
    this.http.post(this.common.base_url +'fetchuserdeatils', Serialized, optionss).map(res=>res.json()).subscribe(data=>{
    console.log(data);
    this.Loading.dismiss();
      if(data.error == 0){

    this.username = data.data.username;
    this.userphone = data.data.phone;
    this.useremail = data.data.email;
    this.prfimage = data.data.image;
    console.log(this.prfimage);
    console.log(this.useremail);
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
   
savedetails(data){
  this.Loading.present();
  console.log()
  console.log(data.value.name);

    var datadfd = {
      username:data.value.name,
      phone:data.value.phone,
      id:this.User,
      // image : this.prfimage
     
    }
    console.log(this.common.options);
var optionss = this.common.options;

    var Serialized = this.serializeObj(datadfd);
    console.log(Serialized);
    
    this.http.post(this.common.base_url +'editusrdetails', Serialized, optionss).map(res=>res.json()).subscribe(data=>{
    console.log(data);
    this.Loading.dismiss();
    if(data.error == 0){
       this.data= data; 
        let toast = this.toastCtrl.create({
    message: data.message,
    duration: 3000,
    position: 'middle'
  });
   toast.present();
    this.show_details();
    
    }
      });
 //alert('error');
    let toast = this.toastCtrl.create({
    message: data.message,
    duration: 3000,
    position: 'middle'
  });
   toast.present();    
    } 
serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }

  changepassword(){
   // alert('change password');
    this.navCtrl.push(ChangepasswordPage);
  }
  account(){
    this.navCtrl.push(AccountPage);
  }
   openActionSheet(){
               
                 var User = localStorage.getItem("USERID");
                console.log(User);
                let actionsheet = this.actionSheetCtrl.create({
                title:"Choose Album",
                buttons:[{
                text: 'Camera',
                handler: () => {
                console.log("Camera Clicked");
                 this.Loading.present();
                  const options: CameraOptions = {
                  quality: 8,
                  sourceType : 1,
                  destinationType: this.camera.DestinationType.DATA_URL,
                  encodingType: this.camera.EncodingType.JPEG,
                  mediaType: this.camera.MediaType.PICTURE
                }
                this.camera.getPicture(options).then((imageData) => {
                  
                  
                  this.prfimage = "data:image/jpeg;base64," + imageData;
                  this.image=imageData;
                  localStorage.setItem("IMG",  this.prfimage);
                  // this.profile_image =  imageData; 
                    var data_img = ({
                                 user_id :User,

               profile_picture :this.image
                      })
                  
                    var serialized_img = this.serializeObj(data_img); 
                    console.log(serialized_img);
                   console.log(this.common.options);
                  var optionss = this.common.options;
                
                  var Serialized = this.serializeObj(data_img);
                  console.log(Serialized);
                  this.http.post(this.common.base_url +'post_user_image_app', Serialized, optionss).map(res=>res.json()).subscribe(data=>{
                  console.log(data);
   
                    this.Loading.dismiss();
                  //  alert("img ->"+data);
                  //  alert("img ->"+JSON.stringify(data));
                   if(data.error == 0){
                  let toast = this.toastCtrl.create({
                  message: data.message,
                  duration: 3000,
                  position: 'middle'
                });
                  toast.present();
                  this.image='';
             
                  // this.data= data; 
    }
      });
      
                }, (err) => {
                alert("Server not Working,Please Check your Internet Connection and try again!");
                this.Loading.dismiss();
                });
                }
                },{
                text: 'Gallery',
                
                handler: () => { this.Loading.present();
                                const options: CameraOptions = {
                                quality: 8,
                                sourceType : 0,
                                destinationType: this.camera.DestinationType.DATA_URL,
                                encodingType: this.camera.EncodingType.JPEG,
                                mediaType: this.camera.MediaType.PICTURE
                              }
                              this.camera.getPicture(options).then((imageData) => {
                            this.prfimage = "data:image/jpeg;base64," + imageData;
                             this.image=imageData;
                                localStorage.setItem("IMG",  this.prfimage);
                             
                                          var data_img = ({
                                 user_id :User,
                                  profile_picture :this.image
                      })
                              
                                var serialized_img = this.serializeObj(data_img); 
                    console.log(serialized_img);
                   console.log(this.common.options);
                  var optionss = this.common.options;
                
                  var Serialized = this.serializeObj(data_img);
                  console.log(Serialized);
                  this.http.post(this.common.base_url +'post_user_image_app', Serialized, optionss).map(res=>res.json()).subscribe(data=>{
                  console.log(data);
   
                    this.Loading.dismiss();
                               if(data.error == 0){
                  let toast = this.toastCtrl.create({
                  message: data.message,
                  duration: 3000,
                  position: 'middle'
                });
                  toast.present();
                  this.image='';
                  // this.data= data; 
    }
      });
                              }, (err) => {
                              alert("Server not Working,Please Check your Internet Connection and try again!");
                              this.Loading.dismiss();
                              });
                }
                },
                {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {
                          console.log('Cancel clicked');
                          this.Loading.dismiss();
                          //  actionsheet.dismiss()         
                        }
                      }
                    ]
                  });

                  actionsheet.present();
                }
}



 