
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform ,MenuController,AlertController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { SerialsPage } from '../pages/serials/serials';
import { SerialsdetailsPage } from '../pages/serialsdetails/serialsdetails';
import { EpisodedetailsPage } from '../pages/episodedetails/episodedetails';
import { TabsPage } from '../pages/tabs/tabs';
import { FiltersPage } from '../pages/filters/filters';
import { MoviesPage } from '../pages/movies/movies';
import { MoviesdetailsPage } from '../pages/moviesdetails/moviesdetails';
import { DownloadfilesPage } from '../pages/downloadfiles/downloadfiles';
import { ForgetpasswordPage } from '../pages/forgetpassword/forgetpassword';
import { SubscribePage } from '../pages/subscribe/subscribe';
import { SerialssubscribePage } from '../pages/serialssubscribe/serialssubscribe';
import { PymntplanPage } from '../pages/pymntplan/pymntplan';
import { PymntmethodPage } from '../pages/pymntmethod/pymntmethod';
import { ConfirmPage } from '../pages/confirm/confirm';
import { CarddetailPage } from '../pages/carddetail/carddetail';
import { AccountPage } from '../pages/account/account';
import { LinksPage } from '../pages/links/links';
import { ModalPage } from '../pages/modal/modal';
import { LogoutPage } from '../pages/logout/logout';
import { ActorsgalleryPage } from "../pages/actorsgallery/actorsgallery";
import { ActordetailsPage } from "../pages/actordetails/actordetails";
import { MoviestrailerPage } from "../pages/moviestrailer/moviestrailer";
import { BillingaddressPage } from '../pages/billingaddress/billingaddress';
import { ShippingaddressPage } from '../pages/shippingaddress/shippingaddress';
import { PymntitemPage } from "../pages/pymntitem/pymntitem";
import { AboutusPage } from "../pages/aboutus/aboutus";
import { PrivacypolicyPage } from "../pages/privacypolicy/privacypolicy";
import { BuynowlistingPage } from "../pages/buynowlisting/buynowlisting";
import { TermsandconditionsPage } from "../pages/termsandconditions/termsandconditions";
import { FullscreenepisodePage } from "../pages/fullscreenepisode/fullscreenepisode";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    [x: string]: any;
  User: string;
  @ViewChild(Nav) nav: Nav;

  rootPage: any =HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,private menu: MenuController, public statusBar: StatusBar,public alertCtrl: AlertController, public splashScreen: SplashScreen) {
    this.initializeApp();
    this.menu.swipeEnable(false, 'menu1');
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Serials', component: SerialsPage },
       { title: 'Movies', component: MoviesPage },
      { title: 'Signin', component: SigninPage },      
      { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.platform.registerBackButtonAction(() => {
                this.showConfirm();
              //  navigator['app'].exitApp();                
            });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
 showConfirm() {
     
    let confirm = this.alertCtrl.create({
       title: '<div style="text-align:center" class="ops">Exit?</div>',
       message: 'Do you want to exit the app?',
       buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Exit',
          handler: () => {
            console.log('Agree clicked');
             navigator['app'].exitApp(); 
             
          }
        }
      ]
    });
    confirm.present();
  }
}

