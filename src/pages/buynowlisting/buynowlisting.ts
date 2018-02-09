import { Component } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { TabsPage } from "../tabs/tabs";

/**
 * Generated class for the DownloadfilesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-buynowlisting',
  templateUrl: 'buynowlisting.html'
})
export class BuynowlistingPage {
  public dataneed='';
  user: string;

  constructor(public navCtrl: NavController,
  public common : CommonProvider,
              public http:Http, public menu: MenuController) {
    this.menu.swipeEnable(false);
                this.listing();
        // alert(user);
  }
  listing(){
    this.user= localStorage.getItem('USERID');
    var datay1 = {
                  userid:this.user,
    }
            //  alert(JSON.stringify(datay1));
    console.log(this.common.options);
var optionss = this.common.options;

    var Serialized = this.serializeObj(datay1);
    console.log(Serialized);
    
    this.http.post(this.common.base_url +'fetchmyorder', Serialized, optionss).map(res=>res.json()).subscribe(datatt=>{
  
      console.log(datatt.data);
      if(datatt.error == 0){
        // console.log(datatt.allseason);
       this.dataneed=datatt.data;
        
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
  backtohome(){
    this.navCtrl.push(TabsPage);
  }
}


