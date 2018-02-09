        import { Component,ViewChild } from '@angular/core';
        import { IonicPage, NavController, NavParams } from 'ionic-angular';
        import { MenuController } from 'ionic-angular';
        import { SigninPage } from '../signin/signin';
        import { TabsPage } from '../tabs/tabs';
        import {Http, Headers, RequestOptions} from '@angular/http';
        import {CommonProvider} from '../../providers/common/common';
        import 'rxjs/add/operator/map';
        import { Camera, CameraOptions } from '@ionic-native/camera';
        import { ToastController } from 'ionic-angular';
        import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
        import { NativeStorage } from '@ionic-native/native-storage';
        import {LoadingController} from 'ionic-angular';
        import { ActionSheetController } from 'ionic-angular';
        /**
         * Generated class for the SignupPage page.
         *
         * See https://ionicframework.com/docs/components/#navigation for more info on
         * Ionic pages and navigation.
         */


        @Component({
          selector: 'page-signup',
          templateUrl: 'signup.html',
        })
        export class SignupPage {
          phone_no: any;
          image: any;
          public bit=0;
          photos: any;
          prfimage: any;
          public data = '';
  public Loading=this.loadingCtrl.create({
    content: 'Please wait...'
    
  });
          constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public http:Http, 
                private camera: Camera,
                public common : CommonProvider,public actionSheetCtrl: ActionSheetController,  public loadingCtrl:LoadingController,private toastCtrl: ToastController, private fb: Facebook,public nativeStorage: NativeStorage, public menu: MenuController) {
    this.menu.swipeEnable(false);
          }
        accessGallery(){
          // alert('camera');
            // const options : CameraOptions = {
            //   quality: 15, // picture quality 
            //   destinationType: this.camera.DestinationType.DATA_URL,
            //   encodingType: this.camera.EncodingType.JPEG,
            //   mediaType: this.camera.MediaType.PICTURE
            // }
            // this.camera.getPicture(options) .then((imageData) => {
            //     this.bit=1;
            //     this.prfimage = "data:image/jpeg;base64," + imageData;
            //     this.image=imageData;
            
              
            //   }, (err) => {
            //     console.log(err);
            //   });
            const options: CameraOptions = {
                                quality: 15,
                                sourceType : 0,
                                destinationType: this.camera.DestinationType.DATA_URL,
                                encodingType: this.camera.EncodingType.JPEG,
                                mediaType: this.camera.MediaType.PICTURE
                              }
                              this.camera.getPicture(options).then((imageData) => {
                                 this.bit=1;
                                              this.prfimage = "data:image/jpeg;base64," + imageData;
                                              this.image=imageData;

                              }, (err) => {
                                    console.log(err);
                                  });
          }
          ionViewDidLoad() {
            console.log('ionViewDidLoad SignupPage');
          }
          signin()
        {
          this.navCtrl.push(SigninPage);
        } 
        signup_form(signup)
        {
          this.Loading.present();
        if(this.image == undefined){
            this.image = '';
        
        console.log(this.common.options);
        var optionss = this.common.options;
      
        var data1={
          username:signup.value.username,
          phone:signup.value.phone,
          email:signup.value.email,
          password:signup.value.password,
          image: this.image,
          role : "user"
        }
        console.log(data1);
       
        var Serialized = this.serializeObj(data1);
        console.log(Serialized);
       
        console.log(data1);
          this.http.post(this.common.base_url +'users',Serialized, optionss).map(res=>res.json()).subscribe(data=>{
          // alert(data);
          // alert(JSON.stringify(data));
          this.Loading.dismiss();
            console.log(data);
            console.log(data.data.phone);
            this.phone_no = data.data.phone;
            console.log(this.phone_no);
            if(data.error == 0){
             this.navCtrl.push(TabsPage);
             localStorage.setItem('USERID',data.data.id);
             localStorage.setItem("USER_DATA",this.phone_no);
             localStorage.setItem('USER_EMAIL',data.data.email);
                let toast = this.toastCtrl.create({
            message: data.message,
            duration: 3000,
            position: 'middle'
          });
          toast.present();
            }else{
              let toast = this.toastCtrl.create({
            message: data.message,
            duration: 3000,
            position: 'middle'
          });
          toast.present();
             
            }
          })
        }
        else{
          this.Loading.present();
        //alert('start');
        console.log(this.common.options);
        var optionss = this.common.options;
        // alert(this.image);
        var data2={
          username:signup.value.username,
          phone:signup.value.phone,
          email:signup.value.email,
          password:signup.value.password,
          image: this.image,
          role : "user"
        }
        // alert(data2);
        // alert(JSON.stringify(data2));
   
       
          this.http.post(this.common.base_url +'users',data2).map(res=>res.json()).subscribe(data=>{
          //             alert(data);
          // alert(JSON.stringify(data));
          // alert("success");
          this.Loading.dismiss();
            console.log(data);
            this.phone_no = data.data.phone;
            console.log(this.phone_no);
            if(data.error == 0){
              let toast = this.toastCtrl.create({
            message: data.data.message,
            duration: 3000,
            position: 'middle'
          });
          toast.present();
             localStorage.setItem('USERID',data.data.id);
             localStorage.setItem("USER_DATA",this.phone_no);
             localStorage.setItem('USER_EMAIL',data.data.email);
              this.navCtrl.push(TabsPage)
            }else{
            // alert(data.msg)
              let toast = this.toastCtrl.create({
            message: data.data.message,
            duration: 3000,
            position: 'middle'
          });
          toast.present();
            }
          },err=>{
            console.log(err);
            // alert("err");
            // alert(err);
            // alert(JSON.stringify(err));
          });
        }
        } 
        serializeObj(obj) {
            var result = [];
            for (var property in obj)
              result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

            return result.join("&");
          }
facebook(){
  //alert('facebook');
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
          //  alert( user.email);
          var url: string = this.common.base_url + 'user_register_fb_app';
var fb_data = {
      username:user.name,
      role:"user",
      facebook_id:user.id,
      profile_picture:user.picture,
      email:user.email,
      phone :'',
      password : '12345'
     
}
//  alert(JSON.stringify(fb_data))
var Serialized = this.serializeObj(fb_data);
console.log(this.common.options);
var optionss = this.common.options;
this.http.post(url, Serialized, optionss).map(res=>res.json()).subscribe(data=>{

  this.Loading.dismiss();
    console.log(data);
     
     if(data.error == 0){
        localStorage.setItem('USERID',data.data._id);
      localStorage.setItem('FBID',data.data._id);
      localStorage.setItem('RANDOM',data.data.random);
       localStorage.setItem('USER_EMAIL',data.data.email);
       
       let toast = this.toastCtrl.create({
     message: data.message,
     duration: 3000,
     position: 'middle'
   });
    toast.present();
    this.navCtrl.push(TabsPage);
      
    
    
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
    alert("error");
    alert(err);
    alert(JSON.stringify(err));
  })

     


        },(error) => {
        this.Loading.dismiss();
          alert(error);
          console.log(error);
        })
      })
    }, (error) => {
       alert(error);
      console.log(error);
    });
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
                  // alert("harman take Picture")
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