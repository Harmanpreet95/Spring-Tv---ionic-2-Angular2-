import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {CommonProvider} from '../../providers/common/common';
import { ModalPage } from '../modal/modal';
import { MoviesdetailsPage } from '../moviesdetails/moviesdetails';
import { AccountPage } from '../account/account';
import { LoadingController, App } from 'ionic-angular';
import { SigninPage } from "../signin/signin";
/**
 * Generated class for the MoviesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */ 

@Component({
  selector: 'page-movies',
  templateUrl: 'movies.html'
})
export class MoviesPage {
    loadGetService(): any {
        throw new Error("Method not implemented.");
    }
  check_value: any;
  serials: any;
  randno: string;
  user: string;
  public list = '';
  public listed='';
  load: any;
  errorValue: string;
  myInput: any;
  movies: any;
  public Loading = this.loadingCtrl.create({
    content: 'Please wait...'
    
  });
  constructor(public navCtrl: NavController, public events: Events,public modalCtrl: ModalController,public navParams: NavParams,
        public http:Http,public loadingCtrl:LoadingController,
        public common : CommonProvider,public app:App, public menu: MenuController) {
    this.menu.swipeEnable(false);
        console.log(this.common.video);
//        this.common.video.forEach(function(key,value){
//            console.log(key);
//            console.log(value);
//        })
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
        this.listing();
     }else{
          localStorage.clear();
    this.app.getRootNav().setRoot(SigninPage);
     this.Loading.dismiss();
     }
   
  })
}
listing(){
  // alert('loading data');
  this.Loading.present();
   var datay1 = {
      loaddata:0
    }
   var Serialized = this.serializeObj(datay1);
console.log(this.common.options);
var option = this.common.options;
this.http.post(this.common.base_url +'videos',Serialized,option).map(res=>res.json()).subscribe(data=>{
   
  console.log(data);
    // alert(data);
    // alert(JSON.stringify(data));
    if(data.error == 0){
      this.errorValue = '2'; 
      this.movies = data.data;
      this.load = data.loadmore;
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
loading(){
   this.Loading.present();
   var datay1 = {
      loaddata:1
    }
   var Serialized = this.serializeObj(datay1);
console.log(this.common.options);
var option = this.common.options;
this.http.post(this.common.base_url +'videos',Serialized,option).map(res=>res.json()).subscribe(data=>{
   
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
 setFilteredItems(){
  
  console.log(this.myInput);
  var keyword = this.myInput.replace(/^\s\s*/, '').replace(/\s\s*$/, '');;
  console.log(keyword);
  console.log(keyword.length);
    
  if(keyword.length == 0) {
    //this.ListScheduledPatients();
    console.log('plz write something');
    this.errorValue = '2'; 
    this.listing();
    console.log(this.errorValue);
  } else {
   this.movies = this.getItems(keyword);
   console.log('Filtering');
   this.errorValue = '0';
   console.log(this.errorValue);
  } 
 }
 getItems(ev) {
      return this.movies.filter((item: any) => {
        console.log(item);
        return item.title.toLowerCase().indexOf(ev.toLowerCase()) > -1;
      }); 
  }
moviesdetails(ids)
 {
 this.app.getRootNav().setRoot(MoviesdetailsPage,{movie_id:ids});
 } 

 presentModal() {
   
    let modal = this.modalCtrl.create(ModalPage);
  modal.present();
   
}
 account()
 {
 this.app.getRootNav().setRoot(AccountPage);
 } 
  ionViewDidLoad(){      
this.events.subscribe('tab-t0-1', (data)=>{
   
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