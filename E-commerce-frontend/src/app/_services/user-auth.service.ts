import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRoles(roles: any[]): void {
    localStorage.setItem("roles", JSON.stringify(roles));
  }

  public getRoles(): any[] {
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : [];
  }

  public setToken(jwtToken: string): void {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  public clear(): void {
    localStorage.clear();
  }

  public isLoggedIn(): boolean {
    return !!this.getToken();
  }

  public isAdmin(){
   const roles:any[] = this.getRoles();
   return roles[0].roleName === 'Admin';
  }

    public isUser(){
   const roles:any[] = this.getRoles();
   return roles[0].roleName === 'User';
  }
}
