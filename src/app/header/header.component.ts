import { Component } from '@angular/core';
import { UserProfileService, User } from '../shared/user-profile.service';
import { CommonModule } from '@angular/common';
import { filter, Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  standalone: true, 
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  userProfile$!: Observable<any>;
  dropdownOptions$!: Observable<User[]>;

  users: User[] = [];
  loginUser!: User;


  constructor(public userProfileService: UserProfileService, private http: HttpClient) {}

  ngOnInit() {
   this.userProfile$ = this.userProfileService.getUserProfile();
   this.dropdownOptions$ = this.userProfileService.getDropdownOptions();
   this.userProfile$
   .pipe(
  filter((user): user is User => user !== null)  // type guard
)
   .subscribe(userProfile => {
    this.loginUser = userProfile;
   })
   this.dropdownOptions$
   .pipe(
  filter((user): user is User[] => user !== null)  // type guard
)
   .subscribe(users => {
    this.users = users;

    //below logic to default select login user
    if(this.loginUser) {
    const user = this.users.find(u => u.id === this.loginUser.id);
      if (user) {
        this.userProfileService.setSelectedUser(user);
      }
    }
   });
  }

  onUserChange(event: any) {
    const userId = +event.target.value;
    const selectedUser = this.users.find(u => u.id === userId);
    this.userProfileService.setSelectedUser(selectedUser);
  }
}
