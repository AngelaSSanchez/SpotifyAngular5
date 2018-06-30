import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Album } from '../../models/albums';
import { Subscription, Observable } from 'rxjs';
import { SpotifyAlbumsService } from '../../sevices/spotify-album/spotify-albums.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css'],
  providers: [ SpotifyAlbumsService ]
})
export class AlbumsComponent implements OnInit {

  album$: Observable<Album>;

  subscription: Subscription;
  id: string;

  constructor(private activatedRoute: ActivatedRoute,
              private spotifyAlbums: SpotifyAlbumsService) {
                this.id = '';
               }

  ngOnInit() {
    this.album$ = this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.spotifyAlbums.getAlbumById(params.get('id')))
    );
  }
}
