import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {CommonProvider} from '../../providers/common/common';
import { SerialssubscribePage } from '../serialssubscribe/serialssubscribe';
import { SerialsPage } from '../serials/serials';
import { EpisodedetailsPage } from '../episodedetails/episodedetails';
import { LoadingController, ToastController } from 'ionic-angular';
import { SubscribePage } from '../subscribe/subscribe';
import { BillingaddressPage } from '../billingaddress/billingaddress';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the SerialsdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-serialsdetails',
  templateUrl: 'serialsdetails.html'
})
export class SerialsdetailsPage {
  select_id: any;
  season_id: any;
  seral: any;
  episea: any;
  sereal: any;
  public toppings = '';
  episodez: any;
  public seasonz = '';
  sreal: any;
  public serialz='';
  vid: string;
  video: any;
   tabBarElement:any;
public Loading = this.loadingCtrl.create({
    content: 'Please wait...'
    
  });
  constructor(public navCtrl: NavController,
    public navParams: NavParams,public http:Http,
    public common : CommonProvider,public loadingCtrl:LoadingController,public app: App,public toastCtrl:ToastController, public menu: MenuController) {
    this.menu.swipeEnable(false);
    this.sreal=this.navParams.get('serial_id')
    this.fectch();
    this.fectchseason();
    this.fetchepisode();
     this.tabBarElement=document.querySelector('.tabbar.show-tabbar');
  } 
  ionViewWillEnter(){
  this.tabBarElement.style.display = 'none';
}
ionViewWillLeave(){
  this.tabBarElement.style.display = 'flex';
}
fectch(){
  // alert("serials fectch");
    // alert(this.sreal);
     this.Loading.present();
    var datay = {
      id :this.sreal,
     
    }
    console.log(this.common.options);
var optionss = this.common.options;

    var Serialized = this.serializeObj(datay);
    console.log(Serialized);
    
    this.http.post(this.common.base_url +'serialbyid', Serialized, optionss).map(res=>res.json()).subscribe(dataall=>{
    console.log(dataall);
      if(dataall.error == 0){
        console.log(dataall.data);
        this.serialz = dataall.data;
         this.Loading.dismiss();
      }else{
        //alert(data.message);
  //       let toast = this.toastCtrl.create({
  //   message: data.message,
  //   duration: 3000,
  //   position: 'middle'
  // });
  //  toast.present();
      }

    })
}
  fectchseason(){
  // alert("season fectching");
    // alert(this.sreal);
     this.Loading.present();
    var datay = {
      id :this.sreal,
     
    }
    console.log(this.common.options);
var optionss = this.common.options;

    var Serialized = this.serializeObj(datay);
    console.log(Serialized);
    
    this.http.post(this.common.base_url +'allseasonsbyid', Serialized, optionss).map(res=>res.json()).subscribe(datatt=>{
    console.log(datatt.allseason);
      if(datatt.error == 0){
        console.log(datatt.allseason);
        this.seasonz= datatt.allseason;
        
         this.Loading.dismiss();
        // this.sereal= datatt.allseason._id;
      }else{
        //alert(data.message);
  //       let toast = this.toastCtrl.create({
  //   message: data.message,
  //   duration: 3000,
  //   position: 'middle'
  // });
  //  toast.present();
      }

    })
}
  
  fetchepisode(){
  // alert("episode fectching");
     this.Loading.present();
    console.log(this.common.options);
var optionss = this.common.options;

    
    this.http.get(this.common.base_url +'episodelist', optionss).map(res=>res.json()).subscribe(datatt=>{
    console.log(datatt.data);
      if(datatt.error == 0){
        console.log(datatt.data);
        this.episodez= datatt.data;
         this.Loading.dismiss();
      }else{
        //alert(data.message);
  //       let toast = this.toastCtrl.create({
  //   message: data.message,
  //   duration: 3000,
  //   position: 'middle'
  // });
  //  toast.present();
      }

    })
}
  fetchseaepi(){
     this.Loading.present();
    // alert('something');
    console.log(this.toppings);
    console.log(this.toppings.trim());
     this.seral=this.navParams.get('seasonz._id');
     var datay = {
      id :this.sreal,
     
    }
    console.log(this.common.options);
    var optionss = this.common.options;

    var Serialized = this.serializeObj(datay);
    console.log(Serialized);
    
    this.http.post(this.common.base_url +'allseasonsbyid', Serialized, optionss).map(res=>res.json()).subscribe(datatt=>{
    console.log(datatt.allseason);
    for(var i =0;i<datatt.allseason.length;i++){
      console.log(datatt.allseason[i].season_name);
      console.log(this.toppings.trim());
      if(datatt.allseason[i].season_name==this.toppings.trim()){
        // alert("if");
        // console.log(datatt.allseason[i]._id);
        this.season_id = datatt.allseason[i]._id;
        console.log(this.season_id);
            var datay1 = {
      serial_id :this.sreal,
      season_id :this.season_id
    }
    console.log(this.common.options);
var optionss = this.common.options;

    var Serialized = this.serializeObj(datay1);
    console.log(Serialized);
    
    this.http.post(this.common.base_url +'episode/allepisodebyid', Serialized, optionss).map(res=>res.json()).subscribe(datatt=>{
    console.log(datatt.allseason);
      if(datatt.error == 0){
        console.log(datatt.allseason);
         this.episodez= datatt.allseason;
          this.Loading.dismiss();
        // this.sereal= datatt.allseason._id;
      }else{
        //alert(data.message);
  //       let toast = this.toastCtrl.create({
  //   message: data.message,
  //   duration: 3000,
  //   position: 'middle'
  // });
  //  toast.present();
      }

    })


      }else{
        // alert("else");
      }
    }
    })


}
  serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }

serialssubscribe()
 {
  // this.navCtrl.push(SerialssubscribePage);
   this.app.getRootNav().setRoot(SerialssubscribePage);
 } 

serials()
 {
   this.navCtrl.push(TabsPage);
  // this.app.getRootNav().setRoot(SerialsPage);
 } 
moveepisode(ids,dis,sid){
  this.select_id=ids;
 
  if(this.select_id==undefined)
    {
      let toast = this.toastCtrl.create({
    message: "please select a season",
    duration: 3000,
    position: 'middle'
  });
   toast.present();
    }else{
  // alert('moving');
  this.navCtrl.push(EpisodedetailsPage,{season_id:ids,serial_id:dis,episode_id:sid});
  //  this.app.getRootNav().setRoot(EpisodedetailsPage,{season_id:ids});
    }
}
subscribe(ids,dis,sid)
 {
  this.navCtrl.push(SubscribePage,{season_id:ids,serial_id:dis,episode_id:sid});
  console.log(ids);
  console.log(dis);
  console.log(sid);
 } 
movtobuy(ids,dis,dat){
   this.select_id=ids;
 
  if(this.select_id==undefined){
    let toast = this.toastCtrl.create({
    message: "please select a season",
    duration: 3000,
    position: 'middle'
  });
   toast.present();
  }else{
  this.navCtrl.push(BillingaddressPage,{season_id:ids,season_name:dis,season_thumb:dat});
  }
 
}
}