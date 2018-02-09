import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {CommonProvider} from '../../providers/common/common';
import {LoadingController} from 'ionic-angular';
import { MoviesdetailsPage } from '../moviesdetails/moviesdetails';
@Component({
  selector: 'page-actordetails',
  templateUrl: 'actordetails.html'
})
export class ActordetailsPage {
  public actormov='';
  public actordetail = '';
  public actorsname = '';
  public actordet = '';
  actorid: any;
public Loading = this.loadingCtrl.create({
    content: 'Please wait...'
    
  });
  constructor(public navCtrl: NavController,public navParams: NavParams,
        public http:Http,public loadingCtrl:LoadingController,
        public common : CommonProvider, public menu: MenuController) {
    this.menu.swipeEnable(false);
//        alert('working')
          this.actorid=this.navParams.get('actor_id');
           this.actorsname=this.navParams.get('actor_name');
          console.log(this.actorid);
           console.log(this.actorsname);
          // this.actdetail();
          this.actormovies();
  }
  
 //  search(){
 //  this.navCtrl.push(SearchdestinationPage);
 // }
back(){
   this.navCtrl.push(TabsPage);
}

// actdetail(){
//    alert('list is comming');
//    var data={
//      actor_id:this.actorid
//    }
//      console.log(data);
//    var Serialized = this.serializeObj(data);
// console.log(this.common.options);
// var option = this.common.options;
// this.http.post(this.common.base_url +'actordetail',Serialized,option).map(res=>res.json()).subscribe(data=>{
   
//   console.log(data);
//     // alert(data);
//     // alert(JSON.stringify(data));
//     if(data.error == 0){
       
//       this.actordet = data.data[0];
//       this.actorsname = data.data[0].name
//       console.log(this.actordet);
      
//       // this.navCtrl.push(SerialsPage); 
//     this.Loading.dismiss();
//     }else{
//       // alert("error ouccured");
//     }
//   })
//  }
actormovies(){
//   alert('list is comming');
   var data={
     name:this.actorsname
   }
     console.log(data);
   var Serialized = this.serializeObj(data);
console.log(this.common.options);
var option = this.common.options;
this.http.post(this.common.base_url +'Movielist_actor',Serialized,option).map(res=>res.json()).subscribe(data=>{
   
  console.log(data);
    // alert(data);
    // alert(JSON.stringify(data));
    if(data.error == 0){
       console.log(data.data);
      this.actordetail = data.data[0];
      console.log(this.actordet);
      this.actormov=data.data
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
  details(ids){
//      alert('detailing');
//      alert('ids');
      this.navCtrl.push(MoviesdetailsPage,{movie_id:ids}); 
  }
}
