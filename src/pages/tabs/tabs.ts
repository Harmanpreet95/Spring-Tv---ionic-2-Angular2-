

import { Events } from 'ionic-angular';
import { Component } from '@angular/core';
   import { MenuController } from 'ionic-angular';
import { SerialsPage } from '../serials/serials';
import { MoviesPage } from '../movies/movies';
import { DownloadfilesPage } from '../downloadfiles/downloadfiles';
import { ActorsgalleryPage } from "../actorsgallery/actorsgallery";
import { MoviestrailerPage } from "../moviestrailer/moviestrailer";
/*
  Generated class for the Tabs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
    
  currState: string;

  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = SerialsPage;
  tab2Root: any = MoviesPage;
  tab3Root: any = DownloadfilesPage;
  tab4Root: any = ActorsgalleryPage;
  tab5Root: any = MoviestrailerPage;


  constructor(public events: Events, public menu: MenuController) {
    this.menu.swipeEnable(false);

  }
onTabUpdate(event){
        let newIndexAfterUpdate = event.activeIndex;
        this.currState = String(newIndexAfterUpdate);
 }
 tabIs(tab) {
    var br = tab._btnId.split('-');
//    alert("br")
//    alert(br)
//    alert(br[2])

    if (br[2] == '1') {
      this.events.publish('tab-t0-1', 'honey');
    }
    else if (br[2] == '3') {
      this.events.publish('tab-t0-3', 'honey');
    }
    else if (br[2] == '0') {
     
      this.events.publish('tab-t0-0', 'honey');
    }
    else if (br[2] == '4') {
      this.events.publish('tab-t0-4', 'honey');
    }else{

    }
     if (br[2] == '2') {
       this.events.publish('tab-t0-2', 'honey');
     }
  }
}
