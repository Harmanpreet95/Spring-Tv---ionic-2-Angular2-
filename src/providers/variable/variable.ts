import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the VariableProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class VariableProvider {

 public baseUrl: string="http://bowdaa.com/bowdaa/";
  // public SIGNUP_API="users/registration"; 
  public SIGNIN_API="api.php"; 
  public FORGOT_PASSWORD_API="api.php";
  public CHANGE_PASSWORD_API="api.php";
  public JOB_api="job_api.php";
  public POST_JOB='job_api.php';
  public EDIT_JOB='job_api.php'; 
  public GET_JOB_DETAIL='job_api.php'; 
  public STATIC_PAGES_API="other_api.php"; 
  public REMOVE_UPLOAD='ajaxall.php';
  public MESSAGE_CHATING='apimessage.php';


  public IMAGE_URI=this.baseUrl+"images/newrequestdocument/"; 
  public PROPOSAL_IMAGE=this.baseUrl+"images/newrequestdocument/proposal_document/";  ////offer_doc_download_path/////
  public IMAGE_URL=this.baseUrl+"images/membersprofilepic/thumbs/"   /////image_url///////////////
  public MESSAGE_DOC_DOWNLOAD=this.baseUrl+"files/";   ////////message doc download//////////
  constructor(public http: Http) {
    console.log('Hello VariableProvider Provider');
  }

}
