import { Component } from '@angular/core';
import { UserProfileService, User } from '../shared/user-profile.service';
import { CommonModule } from '@angular/common';
import { Observable, switchMap } from 'rxjs';
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

  constructor(public userProfileService: UserProfileService, private http: HttpClient) {}

  ngOnInit() {
   this.userProfile$ = this.userProfileService.getUserProfile();
    this.dropdownOptions$ = this.userProfileService.getDropdownOptions();
  }
}
