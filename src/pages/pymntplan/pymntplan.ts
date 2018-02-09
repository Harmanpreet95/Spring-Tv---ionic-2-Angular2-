import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { PymntmethodPage } from '../pymntmethod/pymntmethod';
import {CommonProvider} from '../../providers/common/common';
import {Http, Headers, RequestOptions} from '@angular/http';

/**
 * Generated class for the  PymntplanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-pymntplan',
  templateUrl: 'pymntplan.html'
})
export class PymntplanPage {
  planname: any;
  epiname: any;
  movname: any;
  mov: any;
  epi: any;
  planz: any;

  constructor(public navCtrl: NavController,public navParams: NavParams,public common:CommonProvider,public http:Http, public menu: MenuController) {
    this.menu.swipeEnable(false);
this.listing();
this.epi =this.navParams.get('episode_id') ;
this.mov =this.navParams.get('movie_id');
this.movname =this.navParams.get('movie_name');
this.epiname= this.navParams.get('episode_name');
console.log(this.movname);
console.log(this.epiname);
  }
pymntmthd(ids,dis,vih,sid,his,dat,thi)
 {
  this.navCtrl.push(PymntmethodPage,{plan_id:ids,plan_price:dis,episode_id:vih,movie_id:sid,epimov_name:his,episode_name:dat,plan_name:thi});
 } 
 listing(){
  // this.Loading.present();
  //  alert('loading data');
  // var Serialized = this.serializeObj(this.data);
console.log(this.common.options);
var option = this.common.options;
this.http.get(this.common.base_url +'plans/planlist', option).map(res=>res.json()).subscribe(data=>{
    console.log(data);
    // this.serials = data;
    if(data.error == 0){
      //  this.errorValue = '2'; 
      // this.Loading.dismiss();
      this.planz = data.data;
      console.log(this.planz);
      this.planname=data.data.title;
      console.log(this.planname);
      // localStorage.setItem('plan_id',this.planz._id);
      // this.navCtrl.push(SerialsPage); 
    
    }else{
      alert("error occured");  
    }
  })
}
 
}

