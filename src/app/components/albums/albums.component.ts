import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SpotifyAlbumsService } from './spotify-albums.service';
import { Album } from '../albums';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css'],
  providers: [ SpotifyAlbumsService ]
})
export class AlbumsComponent implements OnInit {

  album: Album;

  subscription: Subscription;
  id: string = '';

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private spotifyAlbums: SpotifyAlbumsService) { }

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe(
      (params) => {
        this.id = params['id'];
        console.log('ID ' + params['id'] );
      }
    );
    if (this.id !== '') {
      this.getAlbumById(this.id);
    }
  }

  getAlbumById (id: string) {
    this.subscription = this.spotifyAlbums.getAlbumById(id).subscribe(
      album => {
        this.album = album;
        console.log('Album' + this.album);
      }
    );
  }

}
