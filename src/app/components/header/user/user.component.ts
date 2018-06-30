import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpotifyProfileService } from '../../../sevices/spotify-profile/spotify-profile.service';
import { Subscription } from 'rxjs';
import { User } from '../../../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  user: User;

  constructor(private userService: SpotifyProfileService) {
  }

  ngOnInit() {
    this.subscription = this.userService.getUserProfile().subscribe(
      user => {
        this.user = user;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
