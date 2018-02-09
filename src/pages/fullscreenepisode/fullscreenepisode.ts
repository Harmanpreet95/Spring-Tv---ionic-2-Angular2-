import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App,Platform } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {CommonProvider} from '../../providers/common/common';
import { SerialssubscribePage } from '../serialssubscribe/serialssubscribe';
import { SerialsPage } from '../serials/serials';
import { SubscribePage } from '../subscribe/subscribe';
import { NativeStorage } from '@ionic-native/native-storage';
import { ToastController } from 'ionic-angular';
import { TabsPage } from "../tabs/tabs";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
/**
 * Generated class for the SerialsdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-fullscreenepisode',
  templateUrl: 'fullscreenepisode.html'
})
export class FullscreenepisodePage {
  [x: string]: any;
  srlt: any;
  srl: any;
 public megadata='';
  public dataiil= ''; downloadprogress;
   tabBarElement:any;
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http:Http,
    public common : CommonProvider,
    public app: App,
    public nativeStorage: NativeStorage,
    public platform:Platform,
    public toastCtrl:ToastController,
    public menu: MenuController,
    public transfer: FileTransfer,
    public file: File
    ) {
    this.menu.swipeEnable(false);
    this.srl=this.navParams.get('season_id');
     this.srlt=this.navParams.get('serial_id');
     this.srltt=this.navParams.get('episode_id');
    this.mov=this.navParams.get('movie_id');
    console.log(this.srl);
    console.log(this.srlt);
     console.log(this.srltt);
     console.log(this.mov);
    this.getlikes(); 
    this.user=localStorage.getItem('USERID');
  //  this.fetchseaepi();
//     this.tabBarElement=document.querySelector('.tabbar.show-tabbar');
//   }
//  ionViewWillEnter(){
//   this.tabBarElement.style.display = 'none';
// }
// ionViewWillLeave(){
//   this.tabBarElement.style.display = 'flex';
// }
    }
getlikes(){
   var datayu = {
      episodeid :this.srltt
     
    }
console.log(this.common.options);
var option = this.common.options;
var Serialized = this.serializeObj(datayu);
    console.log(Serialized);
this.http.post(this.common.base_url +'likesdislikeepisode',Serialized, option).map(res=>res.json()).subscribe(data=>{ 
  console.log(data);  
  if(data.error == 0){
    this.alldata=data.data;
    console.log(this.alldata);
    this.lykval = data.data.countlikes;
     this.dlykval=data.data.countdislikes;
    console.log(this.lykval);
    console.log(this.dlykval);
    this.detailing();
  }else{

  }})
}

detailing(){
  //  alert("movie detail");
    //  alert(this.move);
    
     var datay1 = {
      serialid :this.srlt,
      seasonid :this.srl,
      episodeid:this.srltt
    }
    console.log(this.common.options);
var optionss = this.common.options;

    var Serialized = this.serializeObj(datay1);
    console.log(Serialized);
    
    this.http.post(this.common.base_url +'episodedetail', Serialized, optionss).map(res=>res.json()).subscribe(datatt=>{
  
      console.log(datatt.allseason);
      if(datatt.error == 0){
        console.log(datatt.allseason);
         this.dataiil= datatt.allseason[0];
         this.datvid=datatt.allseason[0].video;
         console.log(this.dataiil);
         console.log(datatt.allseason[0].trailer);
          // localStorage.setItem('epi_id',this.srltt);
          // FileTransfer.download(..).then(..).catch(..);
        // this.sereal= datatt.allseason._id;
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


serials()
 {
   this.navCtrl.push(SerialsPage);
  // this.app.getRootNav().setRoot(SerialsPage);
 } 
movies(){
  this.navCtrl.push(TabsPage);
}

    download() {
        let fileTransfer: FileTransferObject = this.transfer.create();
       alert('downloading');
      
        var data={
        epiormovid:this.srltt
     }
      console.log(this.common.options);
var optionss = this.common.options;

    var Serialized = this.serializeObj(data);
    console.log(Serialized);

     this.http.post(this.common.base_url +'downloads/downloadfile', Serialized, optionss).map(res=>res.json()).subscribe(datatt=>{
  
      console.log("data"+datatt);
      if(datatt.error == 0){
          alert("in");
          this.downepi=datatt.data.video;
      alert(this.downepi);
         var options = {};
         alert(decodeURI(this.downepi))
         var filename = this.downepi.split('/').pop()
         
        alert(filename)
        fileTransfer.download(this.downepi, this.file.externalRootDirectory + "/mydir/"+filename,true,options).then((entry) => {
            alert(JSON.stringify(entry))
        }).catch((downloaderror)=>{
            alert(JSON.stringify(downloaderror));
        })
        
        fileTransfer.onProgress((progressEvent)=>{
              if (progressEvent.lengthComputable) {
        var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
       this.downloadprogress=perc + "% loaded...";
      }
        })
        
        
//           this.platform.ready().then(() => {
//      open(this.downepi, "_system");
////      console.log(this.datvid);
//           })
           }else{
 let toast = this.toastCtrl.create({
                  message: "couldn't download",
                  duration: 3000,
                  position: 'middle'
                });
            toast.present();
     
           }
       
      
    
     })} 
    
likes(){
            // alert('likes');
             var User = localStorage.getItem("USERID");
    console.log(User)
    
              var datayy1 = {
      user_id:User,
      episodeid:this.srltt
    }
    console.log(datayy1);
   var Serialized = this.serializeObj(datayy1);
console.log(this.common.options);
var option = this.common.options;
this.http.post(this.common.base_url +'likeunlikebyepisodeId',Serialized,option).map(res=>res.json()).subscribe(data=>{
   
  console.log(data);
    this.likesdata=data.data;
    console.log(this.likesdata);
     this.lykval = data.data.countlikes;
     this.dlykval=data.data.countdislikes;
   
})
}
}
