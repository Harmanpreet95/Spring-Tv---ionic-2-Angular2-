import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Http, HttpModule, JsonpModule } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import { NavController } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { SerialsPage } from '../pages/serials/serials';
import { FullscreenPage } from '../pages/fullscreen/fullscreen';
import { SerialsdetailsPage } from '../pages/serialsdetails/serialsdetails';
import { EpisodedetailsPage } from '../pages/episodedetails/episodedetails';
import { TabsPage } from '../pages/tabs/tabs';
import { MoviesPage } from '../pages/movies/movies';
import { FiltersPage } from '../pages/filters/filters';
import { MoviesdetailsPage } from '../pages/moviesdetails/moviesdetails';
import { DownloadfilesPage } from '../pages/downloadfiles/downloadfiles';
import { ForgetpasswordPage } from '../pages/forgetpassword/forgetpassword';
import { ChangepasswordPage } from '../pages/changepassword/changepassword';
import { SubscribePage } from '../pages/subscribe/subscribe';
import { PymntplanPage } from '../pages/pymntplan/pymntplan';
import { PymntmethodPage } from '../pages/pymntmethod/pymntmethod';
import { ConfirmPage } from '../pages/confirm/confirm';
import { CarddetailPage } from '../pages/carddetail/carddetail';
import { AccountPage } from '../pages/account/account';
import { LinksPage } from '../pages/links/links';
import { AccordionComponent } from '../components/accordion/accordion';
import { ModalPage } from '../pages/modal/modal';
import { LogoutPage } from '../pages/logout/logout';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {CommonProvider} from '../providers/common/common';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ActorsgalleryPage } from "../pages/actorsgallery/actorsgallery";
import { ActordetailsPage } from "../pages/actordetails/actordetails";
import { MoviestrailerPage } from "../pages/moviestrailer/moviestrailer";
import { BillingaddressPage } from '../pages/billingaddress/billingaddress';
import { ShippingaddressPage } from '../pages/shippingaddress/shippingaddress';
import { PymntitemPage } from "../pages/pymntitem/pymntitem";
import { AboutusPage } from "../pages/aboutus/aboutus";
import { PrivacypolicyPage } from "../pages/privacypolicy/privacypolicy";
import { TermsandconditionsPage } from "../pages/termsandconditions/termsandconditions";
import { BuynowlistingPage } from "../pages/buynowlisting/buynowlisting";
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { FullscreenepisodePage } from "../pages/fullscreenepisode/fullscreenepisode";
import { FilePath } from '@ionic-native/file-path';
import { VideoPlayer } from '@ionic-native/video-player';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    SigninPage,
    SignupPage,
    SerialsPage,
    SerialsdetailsPage,
     TabsPage,
     MoviesPage,
     MoviesdetailsPage,
     DownloadfilesPage,
     ForgetpasswordPage,
     SubscribePage,
     PymntplanPage,
     PymntmethodPage,
     ConfirmPage,
     CarddetailPage,
      AccountPage,
      LinksPage,
      AccordionComponent,
      ModalPage,
       LogoutPage,
       ChangepasswordPage,
       EpisodedetailsPage,
       FullscreenPage,
       FiltersPage,
       ActorsgalleryPage,
       ActordetailsPage,
       MoviestrailerPage,
       BillingaddressPage,
       ShippingaddressPage,
       PymntitemPage,
       AboutusPage,
       PrivacypolicyPage,
       TermsandconditionsPage,
        BuynowlistingPage,
        FullscreenepisodePage
    
    
   
    
  ],
  imports: [
    BrowserModule,
        HttpModule,
        
    IonicModule.forRoot(MyApp),
  ],


  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    SigninPage,
    SignupPage,
    SerialsPage,
    SerialsdetailsPage,
     TabsPage,
     MoviesPage,
     MoviesdetailsPage,
     DownloadfilesPage,
     ForgetpasswordPage,
     SubscribePage,
      PymntplanPage,
      PymntmethodPage,
      ConfirmPage,
      CarddetailPage,
       AccountPage,
         LinksPage,
        AccordionComponent,
        ModalPage,
         LogoutPage,
         ChangepasswordPage,
         EpisodedetailsPage,
         FullscreenPage,
         FiltersPage,
         ActorsgalleryPage,
         ActordetailsPage,
         MoviestrailerPage,
         BillingaddressPage,
         ShippingaddressPage,
         PymntitemPage,
         AboutusPage,
         PrivacypolicyPage,
         TermsandconditionsPage,
          BuynowlistingPage,
          FullscreenepisodePage

      
    
    
    
      
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CommonProvider,
    Camera,
    Facebook,
    NativeStorage,
    PayPal,
    InAppBrowser,
    FilePath,
    File,
    VideoPlayer,
    FileTransfer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
