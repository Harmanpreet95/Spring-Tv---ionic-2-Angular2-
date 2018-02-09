import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { MoviesPage } from '../movies/movies';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {CommonProvider} from '../../providers/common/common';
import { MoviesdetailsPage } from '../moviesdetails/moviesdetails';
import { AccountPage } from '../account/account';
import {LoadingController} from 'ionic-angular';
import { FiltersPage } from '../filters/filters';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the SerialsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html'
})
export class ModalPage {
   public Loading = this.loadingCtrl.create({
    content: 'Please wait...'
    
  });
public list='';
public listed='';
public daties='';
  constructor(public navCtrl: NavController,public navParams: NavParams,
        public http:Http,public loadingCtrl:LoadingController,
        public common : CommonProvider, public menu: MenuController) {
    this.menu.swipeEnable(false);
          this.presentModal();
  }
//  movies()
//  {
//   this.navCtrl.pop(MoviesPage);
//  }
 presentModal() {
   console.log(this.common.options);
var option = this.common.options;
this.http.get(this.common.base_url +'categorylist',option).map(res=>res.json()).subscribe(data=>{
   
  console.log(data);
    // alert(data);
    // alert(JSON.stringify(data));
    if(data.error == 0){
      // this.errorValue = '2'; 
      this.list = data.data;
   
      this.http.get(this.common.base_url +'subcategory/categorylist',option).map(res=>res.json()).subscribe(dataa=>{
   
  console.log(dataa);
    // alert(data);
    // alert(JSON.stringify(data));
    if(data.error == 0){
      // this.errorValue = '2'; 
      this.listed = dataa.data;
  ;
    this.Loading.dismiss();
    }else{
      // alert("error ouccured");
    }
  })
      ; 
    this.Loading.dismiss();
    }else{
      // alert("error ouccured");
    }
  })
  
}
moviecat(id){
console.log(id);
  this.navCtrl.push(FiltersPage,{catid:id})
 
}
moviesubcat(id){
console.log(id);
  this.navCtrl.push(FiltersPage,{subcatid:id})
}
serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }

  bktomovies(){
  this.navCtrl.push(TabsPage)
}

}

