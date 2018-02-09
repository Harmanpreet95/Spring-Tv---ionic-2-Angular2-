import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
import {LoadingController} from 'ionic-angular';
/*
  Generated class for the CommonProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CommonProvider {
  options: RequestOptions;
  base_url: string;
  video:any;
  /* serialise form*/
public serializeObj(obj) {
 var result = [];
   for (var property in obj)
  result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
return result.join("&");
  
 }

 public Loader;
 constructor(public loadingCtrl:LoadingController) {
     console.log('Hello CommonProvider Provider');
     this.Loader=this.loadingCtrl.create({
     content: 'Please wait...',
 });
 let headers = new Headers();
headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
this.options= new RequestOptions({ headers: headers });
 
 //this.base_url = "http://springtv.it/api/";
this.base_url = "http://springtv-env.cqirbmbvzu.us-east-2.elasticbeanstalk.com/api/";

}

}
