import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
   import { MenuController } from 'ionic-angular';
import { PymntplanPage } from '../pymntplan/pymntplan';
import { FullscreenPage } from '../fullscreen/fullscreen';
import 'rxjs/add/operator/map';
import {CommonProvider} from '../../providers/common/common';
import {Http, Headers, RequestOptions} from '@angular/http';
import {LoadingController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { FullscreenepisodePage } from "../fullscreenepisode/fullscreenepisode";
/**
 * Generated class for the SubscribePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-subscribe',
  templateUrl: 'subscribe.html'
})
export class SubscribePage {
  stus: any;
  srltt: any;
  srlt: any;
  srl: any;
  planepiname: any;
  planmovname: any;
  planmov: any;
  planepi: any;
public Loading = this.loadingCtrl.create({
    content: 'Please wait...'
    
  });

  constructor(public navCtrl: NavController,public navParams: NavParams,private toastCtrl: ToastController,public common:CommonProvider,public http:Http, public loadingCtrl:LoadingController, public menu: MenuController) {
    this.menu.swipeEnable(false);
  if(this.common.video!=null){
          for(var i=0;i<this.common.video.length;i++){
            console.log(this.common.video[i]);
            this.common.video[i].pause();
            
        };
    this.planepi =this.navParams.get('episode_id') ;
 this.planmov =this.navParams.get('movie_id') ;
 this.planmovname =this.navParams.get('movie_name') ;
 this.planepiname =this.navParams.get('episode_name');

//  alert(this.planepi);
 console.log(this.planepi);
 console.log(this.planmov);
 console.log(this.planmovname);
 console.log(this.planepiname);
  this.srl=this.navParams.get('season_id');
     this.srlt=this.navParams.get('serial_id');
    
    console.log(this.srl);
    console.log(this.srlt);
        }else{
           this.planepi =this.navParams.get('episode_id') ;
 this.planmov =this.navParams.get('movie_id') ;
 this.planmovname =this.navParams.get('movie_name') ;
 this.planepiname =this.navParams.get('episode_name');

//  alert(this.planepi);
 console.log(this.planepi);
 console.log(this.planmov);
 console.log(this.planmovname);
 console.log(this.planepiname);
  this.srl=this.navParams.get('season_id');
     this.srlt=this.navParams.get('serial_id');
    
    console.log(this.srl);
    console.log(this.srlt);
        }

  }
 
pymnt(ids,dis,sid,sam)
 {
var User=localStorage.getItem('USERID');
  var data={
    userid:User
   }
  console.log(this.common.options);
var optionss = this.common.options;

    var Serialized = this.serializeObj(data);
    console.log(Serialized);
      this.http.post(this.common.base_url +'payment/paymentstatus', Serialized, optionss).map(res=>res.json()).subscribe(datatt=>{
    console.log(datatt.pay);
      if(datatt.error == 0){
        console.log(datatt.pay);
         this.stus= datatt.pay[0].status;
         console.log(this.stus);
          this.Loading.dismiss();
          if(this.stus==0){
            	this.navCtrl.push(PymntplanPage,{episode_id:ids,movie_id:dis,movie_name:sid,episode_name:sam});
          }else{
        //alert(data.message);
        let toast = this.toastCtrl.create({
    message:"You are already a subscriber.",
    duration: 3000,
    position: 'middle'
  });
   toast.present();
       }
       
      }})
    }
    
    
 submit(ids,dis,sid,sam)
{
  if(this.planmov!=undefined){

 
  var User=localStorage.getItem('USERID');
  var data={
    userid:User
   }
  console.log(this.common.options);
var optionss = this.common.options;

    var Serialized = this.serializeObj(data);
    console.log(Serialized);
      this.http.post(this.common.base_url +'payment/paymentstatus', Serialized, optionss).map(res=>res.json()).subscribe(datatt=>{
    console.log(datatt.pay);
      if(datatt.error == 0){
        console.log(datatt.pay);
         this.stus= datatt.pay[0].status;
         console.log(this.stus);
          this.Loading.dismiss();
          if(this.stus==1){
             this.navCtrl.push(FullscreenPage,{movie_id:sam});
             console.log(sam);
          }else{
        //alert(data.message);
        let toast = this.toastCtrl.create({
    message:"You are not a subscriber.",
    duration: 3000,
    position: 'middle'
  });
   toast.present();
       }
       
      }})
  }else{

  var User=localStorage.getItem('USERID');
  var data={
    userid:User
   }
  console.log(this.common.options);
var optionss = this.common.options;

    var Serialized = this.serializeObj(data);
    console.log(Serialized);
      this.http.post(this.common.base_url +'payment/paymentstatus', Serialized, optionss).map(res=>res.json()).subscribe(datatt=>{
    console.log(datatt.pay);
      if(datatt.error == 0){
        console.log(datatt.pay);
         this.stus= datatt.pay[0].status;
         console.log(this.stus);
          this.Loading.dismiss();
          if(this.stus==1){
             this.navCtrl.push(FullscreenepisodePage,{season_id:ids,serial_id:dis,episode_id:sid});
             console.log(sam);
          }else{
        //alert(data.message);
        let toast = this.toastCtrl.create({
    message:"You are not a subscriber.",
    duration: 3000,
    position: 'middle'
  });
   toast.present();
       }
       
      }})
  }
 
}
    serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }
    }
