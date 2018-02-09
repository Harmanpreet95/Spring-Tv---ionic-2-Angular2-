import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { CarddetailPage } from '../carddetail/carddetail';
import { PymntplanPage } from "../pymntplan/pymntplan";
import { TabsPage } from '../tabs/tabs';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import {CommonProvider} from '../../providers/common/common';
/**
 * Generated class for the  ConfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-confirm',
  templateUrl: 'confirm.html'
})
export class ConfirmPage {
    public methodata='';
    public cnfrmdata='';
    cary: any;
  public carry='';
  public Loading = this.loadingCtrl.create({
    content: 'Please wait...'
    
  });
 public planname='';

  constructor(public navCtrl: NavController,public navParams:NavParams,  public common : CommonProvider,
              public http:Http,
              private toastCtrl: ToastController,
              public loadingCtrl:LoadingController, public menu: MenuController) {
    this.menu.swipeEnable(false);
      this.paymnt();
         this.hititfirst();
      
  }
     serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }
  paymnt(){
//      alert("confirm")
      var user = localStorage.getItem("USERID");
      var transid = localStorage.getItem("TRANSID");
      var transts = localStorage.getItem("TRANSTS");
      var transplan = localStorage.getItem("TRANSIPLAN");
      var transprice = localStorage.getItem("TRANSPRICE");
       console.log(this.common.options);
       console.log(this.common.options);
let optionss = this.common.options;
                   
                                  var data_pay = {
                                    userid:user,
                                    transactionid : transid,
                                    price : transprice,
                                    planid : transplan,
                                    planname:this.planname,
                                    paymentmethod : 'Bitcoin',
                                    status:transts,
                                  } 
//                         alert(JSON.stringify(data_pay));
                      let serializ = this.serializeObj(data_pay); 
//                    console.log(serializ);
//                    // var urlenpost= this.common.base_url  + 'payment/paymentgateway';    
        this.http.post(this.common.base_url +'payment/paymentgateway',serializ, optionss)
                     .map(res=>res.json())
                     .subscribe(dataa=>{
                      //  alert("suceess");
                      //  alert(JSON.stringify(dataa));
                       this.cary=dataa.data;
                    
//                          alert(JSON.stringify(this.cary));
//                      alert('redirecting');
                      this.Loading.dismiss();
//                      this.navCtrl.push(ConfirmPage);
                      let toast = this.toastCtrl.create({
                        message: 'Payment Succefully Completed',
                        duration: 3000,
                        position: 'middle'
                      });
                       toast.present();
                 
                                          //  alert(JSON.parse(ids));
                                        })
                                      
                                   
        
             
      
            
    }
    hititfirst(){
      var user = localStorage.getItem("USERID");
      console.log(this.common.options);
var optionss = this.common.options;
                   
                                  var data_pay = {
                                    userid:user,
                                   
                                  } 
                                  //  alert(JSON.stringify(data_pay));
                    var serializ = this.serializeObj(data_pay); 
                    console.log(serializ);
                    // var urlenpost= this.common.base_url  + 'payment/paymentgateway';    
                     this.http.post(this.common.base_url +'plan/plandata',serializ, optionss).map(res=>res.json()).subscribe(dataa=>{
                      //  alert("suceess");
                      //  alert(JSON.stringify(dataa));
                       this.cnfrmdata=dataa.data;
                       this.methodata=dataa.method;
//                          alert("1"+JSON.stringify(this.cnfrmdata));
//                          alert("2"+JSON.stringify(this.methodata));
                      this.Loading.dismiss();
                      let toast = this.toastCtrl.create({
                        message: 'Payment Succefully Completed',
                        duration: 3000,
                        position: 'middle'
                      });
                       toast.present();
                                          //  alert(JSON.parse(ids));
//                      this.navCtrl.push(ConfirmPage);                    
                                        })
                                      

    }
  
 
 backtomain(){
   this.navCtrl.push(TabsPage);
 }
  movetoplan(){
     this.navCtrl.push(PymntplanPage);
  }
}

