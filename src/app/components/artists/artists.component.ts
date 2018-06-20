import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Track, Tracks } from '../../models/track';
import { Album, Albums } from '../../models/albums';
import { SpotifyArtistsService } from '../../sevices/spotify-artist/spotify-artists.service';
import { Artist } from '../../models/artists';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css'],
  providers: [SpotifyArtistsService]
})
export class ArtistsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  id: string;
  tracks: Tracks;
  albums: Album[];
  album: Album;
  artist: Artist;

  public show: boolean;
  audioElement: any;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private artistService: SpotifyArtistsService) {
                this.id = '';
                this.show = false;
               }

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

  getArtistById(id: string) {
    this.subscription = this.artistService.getArtistById(id).subscribe(
      artist => {
        this.artist = artist;
        console.log('TopTracks' + this.tracks);
      }
    );
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
    this.artistService.playTrack(src);
    /**
    this.show = !this.show;

    this.audioElement.src = src;
    if (this.show) {
      this.audioElement.play();
    } else {
      this.audioElement.pause();
    }
    */
  }

}
