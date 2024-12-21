import { inject, Injectable } from '@angular/core';
import { CognitoUserService } from '../../services/cognito-user/cognito-user.service';
import { AuthenticationDetails, CognitoUserSession } from 'amazon-cognito-identity-js';
import { User } from './user.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private cognitoUser= inject(CognitoUserService);
  
  login(email: string, password: string): Promise<User> {
    const cognitoUser = this.cognitoUser.initialize(email);
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authDetails, {
        onSuccess: (result) => {
          const idTokenPayload = result.getIdToken().payload;
          resolve({
            id: idTokenPayload['sub'], 
            email: idTokenPayload['email'], 
          });
        },
        onFailure: (err) => {
          reject(err.message || 'Login failed'); 
        },
      });
    });
  }

  logout(): Promise<void> {
    return new Promise((resolve, reject) => {
      const cognitoUser = this.cognitoUser.getInstance();
      if (cognitoUser) {
        cognitoUser.signOut(() => {
          console.log('User signed out successfully.');
          this.cognitoUser.clearInstance();
          resolve();
        });
      } else {
        console.error('No CognitoUser instance available for logout.');
        reject(new Error('No user session to sign out.'));
      }
    });
  }

  getUsername(): void {
    const cognitoUser = this.cognitoUser.getInstance();
    console.log(cognitoUser?.getSignInUserSession()?.getIdToken().payload);
  }
}
