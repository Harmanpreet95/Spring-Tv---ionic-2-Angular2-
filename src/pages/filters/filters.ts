import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {CommonProvider} from '../../providers/common/common';
import { ModalPage } from '../modal/modal';
import { MoviesdetailsPage } from '../moviesdetails/moviesdetails';
import { AccountPage } from '../account/account';
import {LoadingController} from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the MoviesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */ 

@Component({
  selector: 'page-filters',
  templateUrl: 'filters.html'
})
export class FiltersPage {
  subcatids: any;
  catids: any;
  cat_id: any;
  public list = '';
  public listed='';
  load: any;
  errorValue: string;
  myInput: any;
  movies: any;
  public daties='';
  public Loading = this.loadingCtrl.create({
    content: 'Please wait...'
    
  });
  constructor(public navCtrl: NavController, public modalCtrl: ModalController,public navParams: NavParams,
        public http:Http,public loadingCtrl:LoadingController,
        public common : CommonProvider, public menu: MenuController) {
    this.menu.swipeEnable(false);
          this.moviecat();

  }
 

 serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }

moviecat(){
         this.catids=this.navParams.get('catid');
         console.log(this.catids);
         this.subcatids=this.navParams.get('subcatid');
        console.log(this.subcatids);
        if(this.subcatids == undefined){
//  alert('movie by category');
   var datayy1 = {
      cat_id:this.catids
    }
    console.log(datayy1);
   var Serialized = this.serializeObj(datayy1);
console.log(this.common.options);
var option = this.common.options;
this.http.post(this.common.base_url +'videos/moviebycatid',Serialized,option).map(res=>res.json()).subscribe(data=>{
   
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
        }else{
//           alert('movie by category');
   var data1 = {
      subcatid:this.subcatids
    }
    console.log(data1);
   var Serialized = this.serializeObj(data1);
console.log(this.common.options);
var option = this.common.options;
this.http.post(this.common.base_url +'videos/moviebysubcatid ',Serialized,option).map(res=>res.json()).subscribe(data=>{
   
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
    this.moviecat();
  } else {
    this.movies= this.getItems(keyword);
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
 account()
 {
  this.navCtrl.push(AccountPage);
 } 

  backtomovies()
 {
  this.navCtrl.push(TabsPage);
 } 
}

