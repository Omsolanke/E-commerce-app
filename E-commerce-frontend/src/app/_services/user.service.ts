import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  PATH_OF_API = "http://localhost:9090";

  requestHeader=new HttpHeaders(
    {"No-Auth":"True"}
  )
  constructor(private httpclient: HttpClient
    , private userAuthservice: UserAuthService
  ) { }

  public registerUser(registerData: any) {
    return this.httpclient.post(this.PATH_OF_API + "/registerNewUser", registerData, { headers: this.requestHeader });
  }

  public login(loginData:any){
    return this.httpclient.post(this.PATH_OF_API + "/authenticate", loginData, {headers:this.requestHeader})
  }
 
 public foeUser(){
  return this.httpclient.get(this.PATH_OF_API + '/forUser', {
    responseType: 'text',
  });
 }

  public foeAdmin(){
  return this.httpclient.get(this.PATH_OF_API + '/forAdmin', {
    responseType: 'text',
  });
 }


  public roleMatch(allowedRoles: string[]): boolean {
  const userRoles: any = this.userAuthservice.getRoles();

  if (userRoles != null && userRoles.length > 0) {
    for (let i = 0; i < userRoles.length; i++) {
      for (let j = 0; j < allowedRoles.length; j++) {
        if (userRoles[i].roleName === allowedRoles[j]) {
          return true;
        }
      }
    }
  }
  return false;
}
}
