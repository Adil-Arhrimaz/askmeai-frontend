import { inject, Injectable } from '@angular/core';
import { CognitoUser, CognitoUserPool, CognitoUserSession } from 'amazon-cognito-identity-js';
import { CookieStorageService } from '../cookie-storage/cookie-storage.service'; 
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CognitoUserService {

  private cognitoUser: CognitoUser | null = null;
  private cookieStorage= inject(CookieStorageService);
  
  private userPool: CognitoUserPool = new CognitoUserPool({
    UserPoolId: environment.cognito.UserPoolId,
    ClientId: environment.cognito.ClientId,
    Storage: this.cookieStorage, 
  });

  initialize(username: string): CognitoUser {
    if (!this.cognitoUser) {
      console.log('Initializing CognitoUser instance...');
      this.cognitoUser = new CognitoUser({
        Username: username,
        Pool: this.userPool,
        Storage: this.cookieStorage, 
      });
    } else {
      console.log('CognitoUser instance already initialized.');
    }
    return this.cognitoUser;
  }

  getInstance(): CognitoUser | null {
  if (!this.cognitoUser) {
    const currentUser = this.userPool.getCurrentUser();
    if (currentUser) {
      currentUser.getSession((error: Error | null,session: CognitoUserSession | null ) => {})
      this.cognitoUser = currentUser;
    } else {
      console.log('No user session found.');
    }
  }
  return this.cognitoUser;
}

  clearInstance(): void {
    this.cognitoUser = null;
    console.log('CognitoUser instance cleared.');
  }
}
