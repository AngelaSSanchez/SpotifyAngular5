import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { SpotifyLoginService } from '../spotify-login.service';
import { Profile } from '../components/track';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private subscription: ISubscription;
  @Output() userProfile = new EventEmitter();
  profile: Profile;

  constructor(private spotifyService: SpotifyLoginService) { }

  ngOnInit() {
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
