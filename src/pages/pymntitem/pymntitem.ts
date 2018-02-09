import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { BuynowlistingPage } from "../buynowlisting/buynowlisting";
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import {CommonProvider} from '../../providers/common/common';
import { InAppBrowser } from "@ionic-native/in-app-browser";
/**
 * Generated class for the  PymntmethodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-pymntitem',
  templateUrl: 'pymntitem.html'
})
export class PymntitemPage {
  amount: any;
  price: any;
  status: void;
  cary: any;
  planname: any;
  epimovname: any;
  paid_data: any;

  txnid: any;
  postId: any;
  public Loading = this.loadingCtrl.create({
    content: 'Please wait...'
    
  });
  episode: any;
  plan_p: any;
  plan: string;


  constructor(public navCtrl: NavController,
              public navParams: NavParams, 
              public common : CommonProvider,
              private payPal:PayPal,
              public http:Http,
              private toastCtrl: ToastController,
              public loadingCtrl:LoadingController, private iab: InAppBrowser, public menu: MenuController) {
    this.menu.swipeEnable(false);
              

  } 
 payment(){
  var user= localStorage.getItem('USERID');
        // alert(user);
  //  alert('paypal');
   var price =JSON.parse(localStorage.getItem("PARSALDATA"));
              console.log(JSON.stringify(price));
   this.amount= price.movie_price * price.quantity ;
  //  alert(this.amount);
    var paymentt = this.amount; 
    // alert(paymentt);
  this.payPal.init({
    PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
    PayPalEnvironmentSandbox: 'AWkAsL4qT3mbTpCqivlt762uj7tWTJQ3PwNunAR9EpdKmKnIz1Grph2VL3kQ_K5QWvq15vF8tiW57Mfn'
  }).then(() => {
    // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
    this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
      // Only needed if you get an "Internal Service Error" after PayPal login!
      //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
    })).then(() => {
      let payment = new PayPalPayment(this.amount, 'USD', 'Description', 'sale');
      this.payPal.renderSinglePaymentUI(payment).then((data) => {
      // alert("harman");
      // alert(JSON.stringify(data.response));
      this.txnid = data.response.id;
      // this.status= data.response.status;
      //  alert(this.status);
      //  alert();
      //  alert(JSON.stringify(this.txnid));
      // alert(JSON.stringify(this.txnid));
     console.log(this.common.options);
var optionss = this.common.options;
                   
         var datay1 = {
                  userid:user,
                  paymentmethod:'paypal',
                 transactionid:this.txnid,
                 status:'approved',
                movie_id:price.mov_id,
                movie_name:price.mov_name,
                movie_price:price.movie_price,
                quantity:price.quantity,
                b_name:price.name,
                b_phone:price.phone,
                b_address:price.address,
                b_city:price.city,
                b_state:price.state,
                b_country:price.country,
                b_zip:price.zipcode,
                s_name:price.s_name,
                s_phone:price.sphone,
                s_address:price.saddress,
                s_city:price.scity,
                s_state:price.sstate,
                s_country:price.scountry,
                s_zip:price.szipcode
    }
            //  alert(JSON.stringify(datay1));
    console.log(this.common.options);
var optionss = this.common.options;

    var Serialized = this.serializeObj(datay1);
    console.log(Serialized);
    
    this.http.post(this.common.base_url +'buynow', Serialized, optionss).map(res=>res.json()).subscribe(datatt=>{
  
      console.log(datatt.data);
      if(datatt.error == 0){
        console.log(datatt.allseason);
        this.navCtrl.push(BuynowlistingPage);
      }else{
        
      }

    })

                                      
                                   
        
             
      }, () => {
        alert("Error or render dialog closed without being successful");
        // Error or render dialog closed without being successful
      });
    }, () => {
      alert("Error in configuration");
      // Error in configuration
    });
  }, () => {
     alert('Error in initialization, maybe PayPal isnt supported or something else');
  });
  }
serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }

 braintree()
 {
  //  alert('braintree');
    var price =JSON.parse(localStorage.getItem("PARSALDATA"));
   this.amount = price.movie_price * price.quantity ;
  var planid =  this.plan;
  // alert(planid)
    var user = localStorage.getItem("USERID");
// alert('userid'+user)
    var target = "_blank";
    var options = "location=no,hidden=no";
    var browser = this.iab.create('http://rakesh.crystalbiltech.com/braintree/public_html/?amount='+encodeURIComponent(this.amount)+'&planid='+ encodeURIComponent(this.plan)+'&userid=' + encodeURIComponent(user) + '&planname=' + encodeURIComponent(this.planname) + '&item_name=' + encodeURIComponent(price.mov_name), target, options);
      // alert(JSON.stringify(browser));
    browser.on('loadstart').subscribe((e) => {
//  alert(JSON.stringify(e));

      var redirect_uri = e.url.split('cess');
      // alert(redirect_uri);


     if (e.url.match('status')) {
      browser.close();
      //  alert(e.url)
          //  alert("close");
            let data = e.url.split("?"); 
      let obj = {
        id: '',
        status: '',
      };
      for (let key in data) {
        let myvala = data[key].split("&");
        for (let key1 in myvala) {
          obj[myvala[key1].split("=")[0]] = myvala[key1].split("=")[1];
        }
      };
      // alert(JSON.stringify(obj));
            this.navCtrl.push(BuynowlistingPage)
            // alert(JSON.stringify(obj));
       console.log(this.common.options);
var optionss = this.common.options;
                   
                                  var data_pay = {
                                    userid:user,
                                    transactionid : obj.id,
                                    price :  this.plan_p,
                                    planid :  this.plan,
                                    planname:this.planname,
                                    paymentmethod : 'braintree',
                                    status:obj.status,
                                    movie_id:price.mov_id,
                                    movie_name:price.mov_name,
                                    movie_price:price.movie_price,
                                    quantity:price.quantity,
                                    b_name:price.name,
                                    b_phone:price.phone,
                                    b_address:price.address,
                                    b_city:price.city,
                                    b_state:price.state,
                                    b_country:price.country,
                                    b_zip:price.zipcode,
                                    s_name:price.s_name,
                                    s_phone:price.sphone,
                                    s_address:price.saddress,
                                    s_city:price.scity,
                                    s_state:price.sstate,
                                    s_country:price.scountry,
                                    s_zip:price.szipcode
                                  } 
                                  //  alert(JSON.stringify(data_pay));
                    var serializ = this.serializeObj(data_pay); 
                    console.log(serializ);
                    // var urlenpost= this.common.base_url  + 'payment/paymentgateway';    
                     this.http.post(this.common.base_url +'buynow',serializ, optionss).map(res=>res.json()).subscribe(dataa=>{
                      //  alert("suceess");
                      //  alert(JSON.stringify(dataa));
                       this.cary=dataa.data;
                      //  localStorage.setItem('SUCESS',dataa.data);
                      //    alert(JSON.stringify(this.cary));
                      this.Loading.dismiss();
                      let toast = this.toastCtrl.create({
                        message: 'Payment Succefully Completed',
                        duration: 3000,
                        position: 'middle'
                      });
                       toast.present();
                                          //  alert(JSON.parse(ids));
                      this.navCtrl.push(BuynowlistingPage);                    
                                        },err=>{
                                          alert('err');
                                          alert(err);
                                          alert(JSON.stringify(err));
                                        })
    }else{
// alert("else");
    }
    }, err => {

      // alert(err)
    });

 } 
 bitcoin(){
//     alert('bitcoin');
     
 var price =JSON.parse(localStorage.getItem("PARSALDATA"));
   this.amount = price.movie_price * price.quantity ;
   
    var user = localStorage.getItem("USERID");

  var target = "_blank";
    var options = "location=no,hidden=no";
    let browser = this.iab.create('http://rakesh.crystalbiltech.com/bitcoin/?amount='+encodeURIComponent(this.amount)+'&custom='+ encodeURIComponent(price.mov_id)+'&userid=' + encodeURIComponent(user) + '&item_name=' + encodeURIComponent(price.mov_name), target, options);
   
    browser.on('loadstart').subscribe((e) => {
//        alert(e.url)
 if (e.url.match('status')) {
      browser.close()
//        alert(e.url)
//            alert("close");
            let data = e.url.split("?"); 
      let obj = {
        id: '',
        status: '',
      };
      for (let key in data) {
        let myvala = data[key].split("&");
        for (let key1 in myvala) {
          obj[myvala[key1].split("=")[0]] = myvala[key1].split("=")[1];
        }
      };
//       alert(JSON.stringify(obj));
     console.log(this.common.options);
var optionss = this.common.options;
                   
                                  var data_pay = {
                                    userid:user,
                                    transactionid : obj.id,
                                    price :  this.plan_p,
                                    planid :  this.plan,
                                    planname:this.planname,
                                    paymentmethod : 'braintree',
                                    status:obj.status,
                                    movie_id:price.mov_id,
                                    movie_name:price.mov_name,
                                    movie_price:price.movie_price,
                                    quantity:price.quantity,
                                    b_name:price.name,
                                    b_phone:price.phone,
                                    b_address:price.address,
                                    b_city:price.city,
                                    b_state:price.state,
                                    b_country:price.country,
                                    b_zip:price.zipcode,
                                    s_name:price.s_name,
                                    s_phone:price.sphone,
                                    s_address:price.saddress,
                                    s_city:price.scity,
                                    s_state:price.sstate,
                                    s_country:price.scountry,
                                    s_zip:price.szipcode
                                  } 
                                  //  alert(JSON.stringify(data_pay));
                    var serializ = this.serializeObj(data_pay); 
                    console.log(serializ);
                    // var urlenpost= this.common.base_url  + 'payment/paymentgateway';    
                     this.http.post(this.common.base_url +'buynow',serializ, optionss).map(res=>res.json()).subscribe(dataa=>{
                      //  alert("suceess");
                      //  alert(JSON.stringify(dataa));
                       this.cary=dataa.data;
                      //  localStorage.setItem('SUCESS',dataa.data);
                      //    alert(JSON.stringify(this.cary));
                      this.Loading.dismiss();
                      let toast = this.toastCtrl.create({
                        message: 'Payment Succefully Completed',
                        duration: 3000,
                        position: 'middle'
                      });
                       toast.present();
                                          //  alert(JSON.parse(ids));
                      this.navCtrl.push(BuynowlistingPage);                    
                                        },err=>{
                                          alert('err');
                                          alert(err);
                                          alert(JSON.stringify(err));
                                        })
    }else{
// alert("else");
    }
    }, err => {

      // alert(err)
    });
     
 }
 

}

