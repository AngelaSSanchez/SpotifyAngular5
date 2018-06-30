import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Tracks } from '../../models/track';
import { Album, Albums } from '../../models/albums';
import { SpotifyArtistsService } from '../../sevices/spotify-artist/spotify-artists.service';
import { Artist } from '../../models/artists';
import { Playlists } from '../../models/playlist';
import { SpotifyFollowService } from '../../sevices/spotify-follow/spotify-follow.service';

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

  public show: boolean;
  audioElement: any;

  constructor(private activatedRoute: ActivatedRoute,
              private artistService: SpotifyArtistsService,
              private el: ElementRef) {
                this.id = '';
                this.show = false;
                this.audioElement = new Audio();
               }

  ngOnInit() {
    this.subscription = this.activatedRoute.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = params.get('id');
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

  getArtistById(): Artist {
    this.subscription = this.artistService.getArtistById(this.id).subscribe(
      artist => {
        this.artist = artist;
      }
    );

    return this.artist;
  }

  getArtistTopTracks() {
    this.subscription = this.artistService.getArtistTopTracks(this.id).subscribe(
        tracks => {
          this.tracks = tracks['tracks'];
      }
    );
  }

  getArtistsAlbums() {
    this.subscription = this.artistService.getArtistAlbums(this.id).subscribe(
        albums => {
          this.albums = albums;
      }
    );
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
