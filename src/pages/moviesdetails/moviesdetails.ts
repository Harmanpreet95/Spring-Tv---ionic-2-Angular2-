import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {CommonProvider} from '../../providers/common/common';
import { BillingaddressPage } from '../billingaddress/billingaddress';
import { SubscribePage } from '../subscribe/subscribe';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the MoviesdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-moviesdetails',
  templateUrl: 'moviesdetails.html'
 
})
export class MoviesdetailsPage {
 
  public dlykval = '';
  public lykval='';
  public alldata = '';
  public actorthumb = '';
  public actorname ='';
  public actorid = '';
  movy: any;
  actormov: any;
  public actormovie = '';
  public actorsall:any = '';
  move: any;
  description: any;
  trailer: any; 
  actor: any;
  tabBarElement:any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,public http:Http,
    public common : CommonProvider,public app:App, public menu: MenuController) {
    this.menu.swipeEnable(false);
        this.common.video = document.getElementsByTagName('video');
      console.log(this.common.video);
             if(this.common.video!=null){
          for(var i=0;i<this.common.video.length;i++){
            console.log(this.common.video[i]);
            this.common.video[i].pause();
            
        };
    this.move=this.navParams.get('movie_id');
        this.getlikes();
     this.tabBarElement=document.querySelector('.tabbar.show-tabbar');
        }else{
           this.move=this.navParams.get('movie_id');
            this.getlikes();
     this.tabBarElement=document.querySelector('.tabbar.show-tabbar');
        }
   
    
  }
ionViewWillEnter(){
  this.tabBarElement.style.display = 'none';
}
ionViewWillLeave(){
  this.tabBarElement.style.display = 'flex';
}
getlikes(){
    var datayu = {
      movieid :this.move,
     
    }
console.log(this.common.options);
var option = this.common.options;
var Serialized = this.serializeObj(datayu);
    console.log(Serialized);
this.http.post(this.common.base_url +'likesdislike',Serialized, option).map(res=>res.json()).subscribe(data=>{ 
  console.log(data);  

  this.alldata=data.data;
  this.lykval = data.data.countlikes;
     this.dlykval=data.data.countdislikes;
    console.log(this.lykval);
    console.log(this.dlykval);
  this.detail();
})


}




detail(){
  //  alert("movie detail");
    //  alert(this.move);
     
    var datay = {
      path :this.move,
     
    }
    console.log(this.common.options);
var optionss = this.common.options;

    var Serialized = this.serializeObj(datay);
    console.log(Serialized);
    
    this.http.post(this.common.base_url +'videos/moviebyid', Serialized, optionss).map(res=>res.json()).subscribe(dataall=>{


     console.log(dataall.data);
    //  console.log(dataall.data.actors.length);
    var x = JSON.parse(dataall.data.actors)
     var result = Object.keys(x).map(function(key) {
        return [Number(key), x[key]];
      });
      console.log(result)
   this.actorsall = result;
   this.actormovie = dataall.data;
   this.actorid = dataall.data._id;
   this.actorname = dataall.data.title;
   this.actorthumb = dataall.data.thumbnail;
   console.log(this.actorid);
   console.log(this.actorname);
   console.log(this.actorthumb);
 })

}
  serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }

subscribe(ids,dis)
 {
   this.app.getRootNav().setRoot(SubscribePage,{movie_id:ids,movie_name:dis});
 // this.navCtrl.push(SubscribePage,{movie_id:ids,movie_name:dis});
 } 

movies()
 {
  this.navCtrl.push(TabsPage);
 }  
buynow(ids,dis,dat){ 
  console.log(ids);
  console.log(dis);
  console.log(dat);
 this.app.getRootNav().setRoot(BillingaddressPage,{season_id:ids,season_name:dis,season_thumb:dat});
}

}

