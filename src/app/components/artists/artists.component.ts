import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Track, Tracks } from '../../models/track';
import { Album, Albums } from '../../models/albums';
import { SpotifyArtistsService } from '../../sevices/spotify-artist/spotify-artists.service';
import { Artist } from '../../models/artists';
import { Playlists } from '../../models/playlist';

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
  albums: Albums;
  album: Album;
  artist: Artist;
  playlists: Playlists;
  following: boolean;

  public show: boolean;
  audioElement: any;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private artistService: SpotifyArtistsService) {
                this.id = '';
                this.show = false;
                this.following = false;
                this.audioElement = new Audio();
               }

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe(
      (params) => {
        this.id = params['id'];
      }
    );
    this.getArtistById();
    this.getArtistTopTracks();
    this.getArtistsAlbums();
    this.getPlaylists();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getArtistById() {
    this.subscription = this.artistService.getArtistById(this.id).subscribe(
      artist => {
        this.artist = artist;
        this.following = this.getFollowingArtist();
      }
    );
  }

  getFollowingArtist(): boolean {
    let follow = false;
    this.artistService.checkFollowingArtist(this.id).subscribe(
      following => {
        const foll = following;
        if (foll === 'true') {
          follow = true;
        }
      }
    );

    return follow;
  }

  getArtistTopTracks() {
    this.subscription = this.artistService.getArtistTopTracks(this.id).subscribe(
        tracks => {
          this.tracks = tracks['tracks'];
          console.log('TopTracks' + this.tracks);
      }
    );
  }

  getArtistsAlbums() {
    this.subscription = this.artistService.getArtistAlbums(this.id).subscribe(
        albums => {
          this.albums = albums;
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

  getPlaylists(): Playlists {
    this.subscription = this.artistService.getPlaylists().subscribe(
      playlists => {
         this.playlists = playlists;
      }
    );

    return this.playlists;
  }

  addToPlaylist(trackUri: string, playlistId: string) {
    this.subscription = this.artistService.addTrackToPlaylist(trackUri, playlistId).subscribe();
  }

}
