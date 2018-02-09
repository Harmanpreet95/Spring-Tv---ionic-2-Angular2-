import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { ActordetailsPage } from "../actordetails/actordetails";
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {CommonProvider} from '../../providers/common/common';
import { LoadingController, App, Events } from 'ionic-angular';
import { AccountPage } from '../account/account';
import { SigninPage } from "../signin/signin";
@Component({
  selector: 'page-actorsgallery',
  templateUrl: 'actorsgallery.html'
})
export class ActorsgalleryPage {
  public actornam='';
  user: string;
  serials: any;
  randno: any;
  check_value: any;
  actid: any;
  myInput: any;
  errorValue: string;
  actorz: any;
  public Loading = this.loadingCtrl.create({
    content: 'Please wait...'
    
  });
  constructor(public navCtrl: NavController,public navParams: NavParams,public events:Events,
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
        this.actlist();
     }else{
          localStorage.clear();
    this.app.getRootNav().setRoot(SigninPage);
     this.Loading.dismiss();
     }
   
  })
}
 actlist(){
  //  alert('list is comming');
   var data={
     s:0
   }
     console.log(data);
   var Serialized = this.serializeObj(data);
console.log(this.common.options);
var option = this.common.options;
this.http.post(this.common.base_url +'actors',Serialized,option).map(res=>res.json()).subscribe(data=>{
   
  console.log(data);
    // alert(data);
    // alert(JSON.stringify(data));
    if(data.error == 0){
      this.errorValue = '2'; 
      this.actorz = data.data;
      console.log(this.actorz);
      this.actid= data.data._id;
      this.actornam= data.data.name;
      console.log(this.actid);
      console.log(this.actornam);
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
    this.actlist();
    this.loading()
  } else {
    this.actorz= this.getItems(keyword);
   console.log('Filtering');
   this.errorValue = '0';
   console.log(this.errorValue);
  } 
 } 
 
  getItems(ev) {
      return  this.actorz.filter((item: any) => {
        console.log(item);
        return item.title.toLowerCase().indexOf(ev.toLowerCase()) > -1;
      }); 
  }
 move(id,dis){
  //  alert('moving');
    this.app.getRootNav().setRoot(ActordetailsPage,{actor_id:id,actor_name:dis});  
    // alert(id);
 }
  account()
 {
  this.app.getRootNav().setRoot(AccountPage);
 } 
loading(){
   var data={
     s:1
   }
     console.log(data);
   var Serialized = this.serializeObj(data);
console.log(this.common.options);
var option = this.common.options;
this.http.post(this.common.base_url +'actors',Serialized,option).map(res=>res.json()).subscribe(data=>{
   
  console.log(data);
    // alert(data);
    // alert(JSON.stringify(data));
    if(data.error == 0){
      this.errorValue = '2'; 
      this.actorz = data.data;
      console.log(this.actorz);
      this.actid= data.data[0]._id;
      console.log(this.actid);
      // this.navCtrl.push(SerialsPage); 
    this.Loading.dismiss();
    }else{
      // alert("error ouccured");
    }
  })
}
ionViewDidLoad(){
this.events.subscribe('tab-t0-3', (data)=>{
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
