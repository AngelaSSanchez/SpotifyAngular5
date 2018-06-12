import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { SpotifyLoginService } from '../spotify-login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private subscription: ISubscription;
  profile: any;

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
  }

}
