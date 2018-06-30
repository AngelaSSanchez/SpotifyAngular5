import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Artists } from '../../../../models/artists';
import { SpotifyFollowService } from '../../../../sevices/spotify-follow/spotify-follow.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css'],
})
export class FollowingComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  artists: Artists;

  constructor(private followService: SpotifyFollowService) {
  }

  ngOnInit() {
    this.getUserFollowing();
  }

  unfollowArtist(id: string) {
    this.subscription = this.followService.unfollowArtists(id).subscribe(
      artists => {
        this.artists = this.getUserFollowing();
      }
    );
  }

  getUserFollowing(): Artists {
    this.subscription = this.followService.getUserFollowing().subscribe(
      artists => {
        this.artists = artists['artists'];
      }
    );

    return this.artists;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
