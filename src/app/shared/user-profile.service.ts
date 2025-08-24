import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, switchMap } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface User {
  id: number;
  name: string;
  email: string;
  username: string
}

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  private selectedUserSubject = new BehaviorSubject<any>({id: 0, name: ""});
  selectedUser$ = this.selectedUserSubject.asObservable();

  // update selected user
  setSelectedUser(user: any) {
    this.selectedUserSubject.next(user);
  }

  getUserProfile(): Observable<any> {
    console.log("getUserProfile called");
    return this.http.get('https://jsonplaceholder.typicode.com/users/1');
  }

  getDropdownOptions(): Observable<User[]> {
    console.log("getDropdownOptions called");
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }
}
