import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import {ConfirmPage } from '../confirm/confirm';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import {CommonProvider} from '../../providers/common/common';
import { InAppBrowser } from '@ionic-native/in-app-browser';
/**
 * Generated class for the  PymntmethodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-pymntmethod',
  templateUrl: 'pymntmethod.html'
})
export class PymntmethodPage {
   public transaction_sts='';
   public transaction_id='';
  trans: any;
  paymentnew: any;
  public cary = '';
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
              public loadingCtrl:LoadingController,
            private iab: InAppBrowser, public menu: MenuController) {
    this.menu.swipeEnable(false);
     this.plan =this.navParams.get('plan_id') ;
     this.plan_p = this.navParams.get('plan_price');
      this.episode = this.navParams.get('episode_id');
       this.episode = this.navParams.get('movie_id');
       this.epimovname = this.navParams.get('epimov_name');
       this.epimovname=this.navParams.get('episode_name');
       this.planname=this.navParams.get('plan_name');
    //    alert(this.plan);
      // alert(this.plan_p);
    //  alert( this.episode);
    //  alert(this.epimovname);
    //  alert(this.planname);
  } 
 payment(ids){
   var user= localStorage.getItem('USERID');
        // alert(user);
  //  alert('paypal');
  
    var paymentt =this.plan_p; 
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
      let payment = new PayPalPayment(this.plan_p, 'USD', 'Description', 'sale');
      this.payPal.renderSinglePaymentUI(payment).then((data) => {
      // alert("harman");
      // alert(JSON.stringify(data.response));
      this.txnid = data.response.id;
      // alert(this.txnid);
      // alert(JSON.stringify(this.txnid));
     console.log(this.common.options);
var optionss = this.common.options;
                   
                                  var data_pay = {
                                    userid:user,
                                    transactionid : this.txnid,
                                    price :  this.plan_p,
                                    planid :  this.plan,
                                    planname:this.planname,
                                    paymentmethod : 'payPal',
                                    status: 'approved',
                                  } 
                                  //  alert(JSON.stringify(data_pay));
                    var serializ = this.serializeObj(data_pay); 
                    console.log(serializ);
                    // var urlenpost= this.common.base_url  + 'payment/paymentgateway';    
                     this.http.post(this.common.base_url +'payment/paymentgateway',serializ, optionss).map(res=>res.json()).subscribe(dataa=>{
                      //  alert("suceess");
                      //  alert(JSON.stringify(dataa));
                       this.cary=dataa.data;
                       
                        //  alert(JSON.stringify(this.cary));
                      this.Loading.dismiss();
                      let toast = this.toastCtrl.create({
                        message: 'Payment Succefully Completed',
                        duration: 3000,
                        position: 'middle'
                      });
                       toast.present();
                                          //  alert(JSON.parse(ids));
                      this.navCtrl.push(ConfirmPage);                    
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
// alert("grover")
  var planid =  this.plan;

    var user = localStorage.getItem("USERID");

    var target = "_blank";
    var options = "location=no,hidden=no";
    var browser = this.iab.create('http://rakesh.crystalbiltech.com/braintree/public_html/?amount='+encodeURIComponent(this.plan_p)+'&planid='+ encodeURIComponent(this.plan)+'&userid=' + encodeURIComponent(user) + '&planname=' + encodeURIComponent(this.planname), target, options);
   
    browser.on('loadstart').subscribe((e) => {
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
      
    
var optionss = this.common.options;
                   
                                  var data_pay = {
                                    userid:user,
                                    transactionid : obj.id,
                                    price :  this.plan_p,
                                    planid :  this.plan,
                                    planname:this.planname,
                                    paymentmethod : 'braintree',
                                    status:obj.status,
                                  } 
                                  //  alert(JSON.stringify(data_pay));
                    var serializ = this.serializeObj(data_pay); 
                    console.log(serializ);
                    // var urlenpost= this.common.base_url  + 'payment/paymentgateway';    
                     this.http.post(this.common.base_url +'payment/paymentgateway',serializ, optionss).map(res=>res.json()).subscribe(dataa=>{
                      //  alert("suceess");
                      //  alert(JSON.stringify(dataa));
                       this.cary=dataa.data;
                    
                        //  alert(JSON.stringify(this.cary));
                      this.Loading.dismiss();
                      let toast = this.toastCtrl.create({
                        message: 'Payment Succefully Completed',
                        duration: 3000,
                        position: 'middle'
                      });
                       toast.present();
                                          //  alert(JSON.parse(ids));
                      this.navCtrl.push(ConfirmPage);                    
                                        },err=>{
                                          alert('err');
                                          alert(err);
                                          alert(JSON.stringify(err));
                                        })
                                      
                                   
        
             
      
            // this.navCtrl.push(ConfirmPage)
    }else{
// alert("else");
    }

//  var redirect_uri = e.url.split('cess');
//       alert("bhumika"+redirect_uri);


//       if (redirect_uri[0] == 'http://rakesh.crystalbiltech.com/braintree/public_html/checkout.php') {

//         browser.close();
       
//         this.navCtrl.push(ConfirmPage)
//           alert("close");
//       }else{
// alert("else");
//       }
//       // alert("check")
//       //  this.navCtrl.push(ConfirmPage)
    }, err => {

      // alert(err)
    });

 } 
 bitcoin(){
//     alert('ron');
      var planid =  this.plan;

    var user = localStorage.getItem("USERID");

    var target = "_blank";
    var options = "location=no,hidden=no";
    let browser = this.iab.create('http://rakesh.crystalbiltech.com/bitcoin/?amount='+encodeURIComponent(this.plan_p)+'&planid='+ encodeURIComponent(this.plan)+'&userid=' + encodeURIComponent(user) + '&planname=' + encodeURIComponent(this.planname), target, options);
   
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
      localStorage.setItem('TRANSID', obj.id);
      localStorage.setItem('TRANSTS', obj.status);
      localStorage.setItem('TRANSIPLAN',this.plan);
      localStorage.setItem('TRANSPRICE', this.plan_p);
       this.navCtrl.push(ConfirmPage);

    }

    });
     
 }
 
}
