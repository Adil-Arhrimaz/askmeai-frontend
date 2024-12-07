import { inject, Injectable } from '@angular/core';
import { ICognitoStorage } from 'amazon-cognito-identity-js';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieStorageService implements ICognitoStorage {

  private cookieService = inject(CookieService);

  setItem(key: string, value: string): void {
    console.log(key,value);
    this.cookieService.set(key, value, undefined, '/', undefined, true, 'Strict');
  }

  getItem(key: string): string | null {
    console.log(key);
    return this.cookieService.get(key) || null;
  }

  removeItem(key: string): void {
    console.log(key);
    this.cookieService.delete(key, '/');
    
  }

  clear(): void {
    console.log('clear()');
    this.cookieService.deleteAll('/');
  }

}
