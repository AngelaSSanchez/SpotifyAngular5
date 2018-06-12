import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SpotifyArtistsService } from './spotify-artists.service';
import { Track, PlayTrack, Tracks } from '../track';
import { Album, Albums } from '../albums';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css'],
  providers: [SpotifyArtistsService]
})
export class ArtistsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  id: string = '';
  tracks: Tracks;
  albums: Album[];

  public show:boolean = false;
  audioElement: any;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private artistService: SpotifyArtistsService) { }

  ngOnInit() {
    this.audioElement = new Audio();
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
          this.tracks = tracks['tracks'];
          console.log('TopTracks' + this.tracks);
      }
    );
  }

  getArtistsAlbums(id: string) {
    this.subscription = this.artistService.getArtistAlbums(id).subscribe(
        albums => {
          this.albums = albums.items;
          console.log('Albums' + this.albums);
      }
    );
  }

  followArtist() {
    this.subscription = this.artistService.followArtists(this.id);
  }

  playTrack(src: string) {
    this.show = !this.show;

    this.audioElement.src = src;
    if (this.show) {
      this.audioElement.play();
    } else {
      this.audioElement.pause();
    }
  }

}
