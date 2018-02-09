import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App,Platform } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {CommonProvider} from '../../providers/common/common';
import { ShippingaddressPage } from '../shippingaddress/shippingaddress';
import { TabsPage } from '../tabs/tabs';
import { PymntitemPage } from "../pymntitem/pymntitem";
@Component({
  selector: 'page-billingaddress',
  templateUrl: 'billingaddress.html'
})
export class BillingaddressPage {
 public mov_thumb= '';
  public mov_name = '';
 public data='';
  mov_id: any;
  buydata: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,public http:Http,
    public common : CommonProvider,
    public app: App,
    public platform:Platform, public menu: MenuController) {
    this.menu.swipeEnable(false);
    //  console.log(this.navParams.get('mo_id'));
    //  this.mov_id=this.navParams.get('mo_id');
    //  this.mov_name=this.navParams.get('movie_name');
    //  this.mov_thumb=this.navParams.get('movie_thumb');
     this.mov_id=this.navParams.get('season_id');
     this.mov_name=this.navParams.get('season_name');
     this.mov_thumb=this.navParams.get('season_thumb');
     console.log(this.mov_id); 
     console.log(this.mov_name);
     console.log(this.mov_thumb);
  }
    buylocal(buy){
//      alert('local storage');
//      alert(this.mov_id);
      var datay1 = {
                movie_id:this.mov_id,
                movie_name:this.mov_name,
                movie_price:5,
                quantity:buy.value.quantity,
                b_phone:buy.value.phone,
                b_address:buy.value.address,
                b_city:buy.value.city,
                b_state:buy.value.state,
                b_country:buy.value.country,
                b_zip:buy.value.zipcode,
                s_phone:buy.value.sphone,
                s_address:buy.value.saddress,
                s_city:buy.value.scity,
                s_state:buy.value.sstate,
                s_country:buy.value.scountry,
                s_zip:buy.value.szipcode
    }
              console.log(datay1);
              //  localStorage.setItem('PARSALDATA',datay1);
               localStorage.setItem("PARSALDATA", JSON.stringify(datay1));
               this.navCtrl.push(PymntitemPage);

    }


   buynowdata(buy){
  
//    alert('buynow');

            var datay1 = {
                movie_id:this.mov_id,
                movie_name:this.mov_name,
                movie_price:'',
                quantity:buy.value.quantity,
                b_phone:buy.value.phone,
                b_address:buy.value.address,
                b_city:buy.value.city,
                b_state:buy.value.state,
                b_country:buy.value.country,
                b_zip:buy.value.zipcode,
                s_phone:buy.value.sphone,
                s_address:buy.value.saddress,
                s_city:buy.value.scity,
                s_state:buy.value.sstate,
                s_country:buy.value.scountry,
                s_zip:buy.value.szipcode
    }
    console.log(this.common.options);
var optionss = this.common.options;

    var Serialized = this.serializeObj(datay1);
    console.log(Serialized);
    
    this.http.post(this.common.base_url +'buynow', Serialized, optionss).map(res=>res.json()).subscribe(datatt=>{
  
      console.log(datatt.allseason);
      if(datatt.error == 0){
        console.log(datatt.allseason);
         this.buydata= datatt.allseason;
         console.log(this.buydata);
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
 backtocart(){
 	this.navCtrl.push(TabsPage);
 }
 
 
 

}