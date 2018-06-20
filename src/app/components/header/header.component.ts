import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { User } from '../../models/user';
import { SpotifyProfileService } from '../../sevices/spotify-profile/spotify-profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private subscription: ISubscription;
  @Output() userProfile = new EventEmitter();
  profile: User;
  userId: string;

  constructor(private spotifyService: SpotifyProfileService) { }

  ngOnInit() {
    this.userId = localStorage.getItem('user');
    this.getProfileData();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getProfileData() {
    this.subscription = this.spotifyService.getProfile().subscribe(
      profile => this.profile = profile
    );
    this.userProfile.emit(this.profile);
  }

}
