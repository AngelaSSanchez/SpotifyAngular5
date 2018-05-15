import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { SpotifyArtistsService } from './spotify-artists.service';
import { Track, PlayTrack } from '../track';
import { Albums } from '../albums';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css'],
  providers: [SpotifyArtistsService]
})
export class ArtistsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  id: string = '';
  tracks: Track[];
  albums: Albums[];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private artistService: SpotifyArtistsService) { }

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe(
      (params) => {
        this.id = params['id'];
      }
    );
    this.getArtistTopTracks(this.id);
    this.getArtistsAlbums(this.id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getArtistTopTracks(id: string) {
    this.subscription = this.artistService.getArtistTopTracks(id).subscribe(
        tracks => {
          this.tracks = tracks.items;
          console.log(this.tracks);
      }
    );
  }

  getArtistsAlbums(id: string) {
    this.subscription = this.artistService.getArtistAlbums(id).subscribe(
        albums => {
          this.tracks = albums.items;
          console.log(this.albums);
      }
    );
  }

  followArtist() {
    this.subscription = this.artistService.followArtists(this.id);
  }

}