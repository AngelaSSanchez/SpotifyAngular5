import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from '../../models/albums';
import { Subscription } from 'rxjs';
import { SpotifyAlbumsService } from '../../sevices/spotify-album/spotify-albums.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css'],
  providers: [ SpotifyAlbumsService ]
})
export class AlbumsComponent implements OnInit {

  album: Album;

  subscription: Subscription;
  id: string;

  constructor(private activatedRoute: ActivatedRoute,
              private spotifyAlbums: SpotifyAlbumsService) {
                this.id = '';
               }

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe(
      (params) => {
        this.id = params['id'];
      }
    );
    if (this.id !== '') {
      this.getAlbumById();
    }
  }

  getAlbumById () {
    this.subscription = this.spotifyAlbums.getAlbumById(this.id).subscribe(
      album => {
        this.album = album;
      }
    );
  }

}
