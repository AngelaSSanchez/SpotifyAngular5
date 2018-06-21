import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpotifyPlaylistService } from '../../../../sevices/spotify-playlist/spotify-playlist.service';
import { Artists } from '../../../../models/artists';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  subscription: Subscription;
  artists: Artists;

  constructor(private playlistService: SpotifyPlaylistService) {
  }

  ngOnInit() {
    this.subscription = this.playlistService.getUserFollowing().subscribe(
      artists => {
        this.artists = artists;
      }
    );
  }

}
