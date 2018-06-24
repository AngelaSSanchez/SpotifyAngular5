import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpotifyPlaylistService } from '../../../../sevices/spotify-playlist/spotify-playlist.service';
import { Artists } from '../../../../models/artists';
import { SpotifyProfileService } from '../../../../sevices/spotify-profile/spotify-profile.service';
import { SpotifyArtistsService } from '../../../../sevices/spotify-artist/spotify-artists.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css'],
  providers: [SpotifyArtistsService]
})
export class FollowingComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  artists: Artists;

  constructor(private profileService: SpotifyProfileService,
              private artistService: SpotifyArtistsService) {
  }

  ngOnInit() {
    this.getUserFollowing();
  }

  unfollowArtist(id: string) {
    this.subscription = this.artistService.unfollowArtists(id).subscribe(
      artists => {
        this.artists = this.getUserFollowing();
      }
    );
  }

  getUserFollowing(): Artists {
    this.subscription = this.profileService.getUserFollowing().subscribe(
      artists => {
        this.artists = artists['artists'];
        console.log(this.artists);
      }
    );

    return this.artists;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
