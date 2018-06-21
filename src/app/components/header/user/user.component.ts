import { Component, OnInit } from '@angular/core';
import { SpotifyProfileService } from '../../../sevices/spotify-profile/spotify-profile.service';
import { Subscription } from 'rxjs';
import { User } from '../../../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userId: string;
  subscription: Subscription;
  user: User;

  constructor(private userService: SpotifyProfileService) {
    this.userId = localStorage.getItem('user');
  }

  ngOnInit() {
    this.subscription = this.userService.getUserProfile().subscribe(
      user => {
        this.user = user;
      }
    );
  }

}
