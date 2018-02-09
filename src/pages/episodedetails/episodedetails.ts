import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {CommonProvider} from '../../providers/common/common';
import { SerialssubscribePage } from '../serialssubscribe/serialssubscribe';
import { SerialsPage } from '../serials/serials';
import { SubscribePage } from '../subscribe/subscribe';
import { NativeStorage } from '@ionic-native/native-storage';
import {TabsPage} from '../tabs/tabs';

/**
 * Generated class for the SerialsdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-episodedetails',
  templateUrl: 'episodedetails.html'
})
export class EpisodedetailsPage {
  [x: string]: any;
  srlt: any;
  srl: any;
 public megadata='';
   tabBarElement:any;
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,public http:Http,
    public common : CommonProvider,public app: App,public nativeStorage: NativeStorage, public menu: MenuController) {
    this.menu.swipeEnable(false);
     this.common.video = document.getElementsByTagName('video');
      console.log(this.common.video);
             if(this.common.video!=null){
          for(var i=0;i<this.common.video.length;i++){
            console.log(this.common.video[i]);
            this.common.video[i].pause();
            
        };
         this.srl=this.navParams.get('season_id')
     this.srlt=this.navParams.get('serial_id')
     this.srltt=this.navParams.get('episode_id')
    this.user=localStorage.getItem("USERID");
    console.log(this.srl);
    console.log(this.srlt);
     console.log(this.srltt);
     
   this.fetchseaepi();
    this.tabBarElement=document.querySelector('.tabbar.show-tabbar');
        }else{
            this.srl=this.navParams.get('season_id')
     this.srlt=this.navParams.get('serial_id')
     this.srltt=this.navParams.get('episode_id')
    this.user=localStorage.getItem("USERID");
    console.log(this.srl);
    console.log(this.srlt);
     console.log(this.srltt);
     
   this.fetchseaepi();
    this.tabBarElement=document.querySelector('.tabbar.show-tabbar');
        }
   
  }
 ionViewWillEnter(){
  this.tabBarElement.style.display = 'none';
}
ionViewWillLeave(){
  this.tabBarElement.style.display = 'flex';
}
  fetchseaepi(){
  
    // alert('data aa raha bhai wait')
            var datay1 = {
      user_id:this.user,
      serialid :this.srlt,
      seasonid :this.srl,
      episodeid:this.srltt
    }
    console.log(this.common.options);
var optionss = this.common.options;

    var Serialized = this.serializeObj(datay1);
    console.log(Serialized);
    
    this.http.post(this.common.base_url +'episodedetail', Serialized, optionss).map(res=>res.json()).subscribe(datatt=>{
  
      console.log(datatt.allseason);
      if(datatt.error == 0){
        console.log(datatt.allseason);
         this.megadata= datatt.allseason;
         console.log(this.megadata);
         console.log(datatt.allseason[0].trailer);
          localStorage.setItem('epi_id',this.srltt);
        // this.sereal= datatt.allseason._id;
      }else{
        
      }

    })

  }

  serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }

serialssubscribe(sid,dis,dat,tad)
 {
  // this.navCtrl.push(SerialssubscribePage);
   this.app.getRootNav().setRoot(SubscribePage,{episode_id:sid,episode_name:dis,serial_id:dat,season_id:tad});
  //  alert(sid);
  //  alert(dis);
 } 

serials()
 {
//   this.navCtrl.push(SerialsPage);
   this.app.getRootNav().setRoot(TabsPage);
 } 

//  playVideo(){this.video = document.getElementById("myVideo");
//          this.vid = 'https://springtv.s3.us-east-2.amazonaws.com/profilepic%2F1507618920119JUSTICE+LEAGUE+-+Official+Heroes+Trailer.mp4';
//       this.video.src = this.vid; 
//       this.video.play();
    
//   }
//     pause(){
//       alert('pausing the video');
//       this.video.pause();
//     }
}