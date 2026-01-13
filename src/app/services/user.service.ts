import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   private userSubject = new BehaviorSubject<any>(null);  // default: null
  user$ = this.userSubject.asObservable();               // subscribe to this

  setUser(user: any) {
    this.userSubject.next(user);
  }

  getUser() {
    return this.userSubject.getValue();
  }
}
