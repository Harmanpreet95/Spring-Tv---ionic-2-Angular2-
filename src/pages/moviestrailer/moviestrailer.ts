import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {CommonProvider} from '../../providers/common/common';
import { LoadingController, App } from 'ionic-angular';
import { AccountPage } from '../account/account';
import { SigninPage } from "../signin/signin";
import { Events } from 'ionic-angular';
@Component({
  selector: 'page-moviestrailer',
  templateUrl: 'moviestrailer.html'
})
export class MoviestrailerPage {
  user: any;
  serials: any;
  check_value: any;
  randno: any;
  trailview: any;
 public traildata='';
  public Loading = this.loadingCtrl.create({
    content: 'Please wait...'
    
  });
  constructor(public navCtrl: NavController,public navParams: NavParams,public events:Events,
        public http:Http,public loadingCtrl:LoadingController,
        public common : CommonProvider,public app:App, public menu: MenuController) {
    this.menu.swipeEnable(false);
      this.common.video = document.getElementsByTagName('video');
      console.log(this.common.video);
             if(this.common.video!=null){
          for(var i=0;i<this.common.video.length;i++){
            console.log(this.common.video[i]);
            this.common.video[i].pause();
            
        };
         this.user= localStorage.getItem('USER_EMAIL');
             console.log(this.user);
         // this.listing();
         this.check();
              this.randno=localStorage.getItem('RANDOM');
       console.log(this.randno);
        }else{
            this.user= localStorage.getItem('USER_EMAIL');
             console.log(this.user);
         // this.listing();
         this.check();
           this.randno=localStorage.getItem('RANDOM');
    console.log(this.randno);
        }
  }
    check(){
  this.Loading.present();
  // alert('loading data');
 var datay1 = {
      email:this.user
    }
   var Serialized = this.serializeObj(datay1);
console.log(this.common.options);
var option = this.common.options;
this.http.post(this.common.base_url +'users_login_check',Serialized,option).map(res=>res.json()).subscribe(data=>{
   
  console.log(data);
    this.serials = data;
    this.check_value=data.user
      console.log(this.randno);
         console.log( this.check_value);
   if(this.randno==this.check_value)
     {
        this.Loading.dismiss();
        this.latesttrail();
     }else{
          localStorage.clear();
    this.app.getRootNav().setRoot(SigninPage);
     this.Loading.dismiss();
     }
   
  })
}
  latesttrail(){
//    alert('trailers');
    var option = this.common.options;
this.http.get(this.common.base_url +'latesttrailers',option).map(res=>res.json()).subscribe(data=>{
   
  console.log(data);
    // alert(data);
    // alert(JSON.stringify(data));
    if(data.error == 0){
       
      this.traildata = data.data;
      console.log(this.traildata);
      this.trailview=data.data.trailer;
      console.log(this.trailview);
      // this.navCtrl.push(SerialsPage); 
    this.Loading.dismiss();
    }else{
      // alert("error ouccured");
    }
  })
 }
serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }

  
  
//  setFilteredItems(){
  
//   console.log(this.myInput);
//   var keyword = this.myInput.replace(/^\s\s*/, '').replace(/\s\s*$/, '');;
//   console.log(keyword);
//   console.log(keyword.length);
    
//   if(keyword.length == 0) {
//     //this.ListScheduledPatients();
//     console.log('plz write something');
//     this.errorValue = '2'; 
//     console.log(this.errorValue);
//     this.actlist();
//   } else {
//     this.actorz= this.getItems(keyword);
//    console.log('Filtering');
//    this.errorValue = '0';
//    console.log(this.errorValue);
//   } 
//  }
 
//   getItems(ev) {
//       return  this.actorz.filter((item: any) => {
//         console.log(item);
//         return item.title.toLowerCase().indexOf(ev.toLowerCase()) > -1;
//       }); 
//   }
   account()
 {
   this.app.getRootNav().setRoot(AccountPage);
 } 
ionViewDidLoad(){
this.events.subscribe('tab-t0-4', (data)=>{
//    alert("bhumika")
      console.log(this.navCtrl.canGoBack())
//      if(this.navCtrl.canGoBack() == true){
//        this.navCtrl.popToRoot()
//      } 
      for(var i=0;i<this.common.video.length;i++){
            console.log(this.common.video[i]);
            this.common.video[i].pause();  
             this.check();

            
        };
    
       //alert('working')
     })
}
}
