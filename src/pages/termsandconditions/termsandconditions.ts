import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
   import { MenuController } from 'ionic-angular';
import {CommonProvider} from '../../providers/common/common';
import {Http, Headers, RequestOptions} from '@angular/http';
 import 'rxjs/add/operator/map';
import { AccountPage } from '../account/account';

@Component({
  selector: 'page-termsandconditions',
  templateUrl: 'termsandconditions.html'
})
export class TermsandconditionsPage {
 public head='';
  public descrip='';

  constructor(public navCtrl: NavController,public http:Http, public common : CommonProvider, public menu: MenuController) {
    this.menu.swipeEnable(false);
      this.listing();

  }
   listing(){
//    alert('about us');
 console.log(this.common.options);
var optionss = this.common.options;
 this.http.get(this.common.base_url +'pages/pagelist', optionss).map(res=>res.json()).subscribe(data=>{
    console.log(data);
    
      if(data.error == 0){

    console.log(data.data[2]);
    this.descrip=data.data[2].description
    this.head=data.data[2].title

  //       let toast = this.toastCtrl.create({
  //   message: data.message,
  //   duration: 3000,
  //   position: 'middle'
  // });
  //  toast.present();
      
     

      }else{
        //alert(data.message);
  //       let toast = this.toastCtrl.create({
  //   message: data.message,
  //   duration: 3000,
  //   position: 'middle'
  // });
  //  toast.present();
      }

    })}
serializeObj(obj) {
            var result = [];
            for (var property in obj)
              result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

            return result.join("&");
          }
  backtoaccount(){
   this.navCtrl.push(AccountPage);
 }
 
}
