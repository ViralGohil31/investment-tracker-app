import { Component } from '@angular/core';
import { UserProfileService, User } from '../shared/user-profile.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  standalone: true, 
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

   user?: User;
   users?: User[];
  constructor(private userProfileService: UserProfileService) {}

   async ngOnInit() {
    this.userProfileService.getUserProfile().subscribe(user => {
      this.user = user; // updates automatically when userId changes
    });

     this.userProfileService.setSelectedValue(2);

     this.users = await this.userProfileService.getAllUsers();

     //this.users.forEach(user => console.log(user));
  }
}
