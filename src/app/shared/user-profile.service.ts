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

   private selectedValueSource = new BehaviorSubject<number>(1);
   selectedValue$ = this.selectedValueSource.asObservable();


   setSelectedValue(value: number) {
    this.selectedValueSource.next(value);
  }

  // expose API data based on selection
  getUserProfile(): Observable<User> {
    return this.selectedValue$.pipe(
      switchMap(item =>
        this.http.get<any>(`https://jsonplaceholder.typicode.com/users/${item}`)
      )
    );
  }

  async getAllUsers(): Promise<User[]> {
    return fetch(this.apiUrl)
    .then((response) => {
        if(!response.ok) {
            throw new Error("Error while fetching UserProfile"); //this will caught by catch block
        }
        console.log("response",response);
        return response.json(); // this .json also return a promise ,as then always return a new promise but here we are already return a promise so it will adopt the state of already return prmoise and will return this prmoise only to next then
    })
    .then((data) => {
        console.log("data", data); // this waits until .json() resolves in previous .then 
        if(!Array.isArray(data)) {
            throw new Error("Invalid UserProfile data format"); //will get caught by catch block
        }
       
        return data;
    })
    // .then((users) => {
    //     console.log("Promise result", users);
    //     return users;
    // })
    .catch(error => {
        console.error("Error" , error.message);
         return [];
    });
  }
}
