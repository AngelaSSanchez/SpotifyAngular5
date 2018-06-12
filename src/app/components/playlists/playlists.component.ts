import { Component, OnInit, OnChanges, OnDestroy, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { SpotifyLoginService } from '../../spotify-login.service';
import { SpotifyPlaylistService } from './spotify-playlist.service';
import { Playlist } from './playlist';
import { CreatePlaylistComponent } from './create-playlist/create-playlist.component';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css'],
  providers: [SpotifyPlaylistService],
})
export class PlaylistsComponent implements OnInit, OnDestroy {

  token: string;
  username: string;
  profile: any;
  playlists: Playlist[];
  selectedPlaylist: Playlist;
  playlistName: string;

  private subscription: ISubscription;

  constructor(private spotifyService: SpotifyLoginService,
              private playlistService: SpotifyPlaylistService,
              public dialog: MatDialog
            ) { }

  ngOnInit() {
    this.getProfileData();
    this.getPlaylists();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



  getProfileData() {
    this.subscription = this.spotifyService.getProfile().subscribe(
      profile => this.profile = profile
    );
  }

  getPlaylists() {
    this.subscription = this.playlistService.getPlaylists().subscribe(
      results => {
         this.playlists = results.items;
      }
    );
  }

  onSelect(playlist: Playlist) {
    this.selectedPlaylist = playlist;
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(CreatePlaylistComponent, {
      width: '250px',
      data: { playlistName: this.playlistName }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.playlistName = result;
      if (this.playlistName != null) {
        this.createPlaylist(this.playlistName);
      }
    });
  }

  createPlaylist(playlistName: string) {
    this.playlistService.createPlaylist(playlistName, this.profile.id);
    this.getPlaylists();
  }
}
