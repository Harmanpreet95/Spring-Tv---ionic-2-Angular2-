import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {CommonProvider} from '../../providers/common/common';
import { SerialsdetailsPage } from '../serialsdetails/serialsdetails';
import { AccountPage } from '../account/account';
import {LoadingController} from 'ionic-angular';
import 'rxjs/add/operator/filter';
import { SigninPage } from '../signin/signin';

/**
 * Generated class for the SerialsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-serials',
  templateUrl: 'serials.html'
})
export class SerialsPage {
  check_value: any;
  user: string;
  randno: any;
  movies: any;
  serials_LIST: any;
  country_list: any;
  searchArray: any;
  myInput: any;
  errorValue: string;
  searchList: any;
  name: any;
  serials;
 public data = '';
public Loading = this.loadingCtrl.create({
    content: 'Please wait...'
    
  });
  constructor(public navCtrl: NavController,
				public navParams: NavParams, public events:Events,
        public http:Http,public loadingCtrl:LoadingController,
        public common : CommonProvider,public app:App, public menu: MenuController) {
    this.menu.swipeEnable(false);
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
   console.log(datay1);
console.log(this.common.options);
var option = this.common.options;
this.http.post(this.common.base_url +'users_login_check',Serialized,option).map(res=>res.json()).subscribe(data=>{
   
  console.log(data);
    this.serials = data;
    this.check_value=data.user
//    alert(JSON.stringify(this.randno)); 
//         alert(JSON.stringify(this.check_value));
   if(this.randno==this.check_value)
     {
        this.Loading.dismiss();
        this.listing();
     }else{
          localStorage.clear();
    this.app.getRootNav().setRoot(SigninPage);
     this.Loading.dismiss();
     }
   
  })
}
 
listing(){
  this.Loading.present();
  // alert('loading data');
  // var Serialized = this.serializeObj(this.data);
console.log(this.common.options);
var option = this.common.options;
this.http.get(this.common.base_url +'serials', option).map(res=>res.json()).subscribe(data=>{
    console.log(data);
    // this.serials = data;
    if(data.error == 0){
       this.errorValue = '2'; 
      this.Loading.dismiss();
      this.serials = data.data;
      // this.navCtrl.push(SerialsPage); 
    
    }else{
      alert("error occured");  
    }
  })
}
 setFilteredItems(){
  
  console.log(this.myInput);
  var keyword = this.myInput.replace(/^\s\s*/, '').replace(/\s\s*$/, '');;
  console.log(keyword);
  console.log(keyword.length);
    
  if(keyword.length == 0) {
    //this.ListScheduledPatients();
    console.log('plz write something');
    this.errorValue = '2'; 
    console.log(this.errorValue);
    this.listing();
  } else {
   this.serials = this.getItems(keyword);
   console.log('Filtering');
   this.errorValue = '0';
   console.log(this.errorValue);
  } 
 }
 
  getItems(ev) {
      return this.serials.filter((item: any) => {
        console.log(item);
        return item.title.toLowerCase().indexOf(ev.toLowerCase()) > -1;
      }); 
  }

 serialsdetails(ids)
 {
   this.app.getRootNav().setRoot(SerialsdetailsPage,{serial_id:ids});
    // this.app.getRootNav().setRoot(SerialsdetailsPage,{serial_id:ids});
 } 
account()
 {
  // this.navCtrl.push(AccountPage);
   this.app.getRootNav().setRoot(AccountPage);
 } 
  loading(){
   this.Loading.present();
   var datay1 = {
      loaddata:1 
    }
   var Serialized = this.serializeObj(datay1);
console.log(this.common.options);
var option = this.common.options;
this.http.post(this.common.base_url +'loadmore_episode',Serialized,option).map(res=>res.json()).subscribe(data=>{
   
  console.log(data);
    // alert(data);
    // alert(JSON.stringify(data));
    if(data.error == 0){
      this.errorValue = '2'; 
      this.movies = data.data;
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
  ionViewDidLoad(){
      
       this.events.subscribe('tab-t0-0', (data)=>{
    console.log(data);
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
//  tabchange(){
//this.events.subscribe('tab-t0-1', (data)=>{
//    console.log(data);
//      console.log(this.navCtrl.canGoBack())
//      if(this.navCtrl.canGoBack() == true){
//        this.navCtrl.popToRoot()
//      } 
//       this.check();
//       //alert('working')
//     })
//}
}

