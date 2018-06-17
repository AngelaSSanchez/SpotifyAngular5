import { Component, OnInit, OnChanges, OnDestroy, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { SpotifyLoginService } from '../../spotify-login.service';
import { SpotifyPlaylistService } from './spotify-playlist.service';
import { Playlist, Playlists } from './playlist';
import { CreatePlaylistComponent } from './create-playlist/create-playlist.component';
import { Profile } from '../track';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css'],
  providers: [SpotifyPlaylistService],
})
export class PlaylistsComponent implements OnInit, OnDestroy {

  token: string;
  username: string;
  profile: Profile;
  playlists: Playlists;
  selectedPlaylist: Playlist;
  playlistName: string;
  index: number;

  private subscription: ISubscription;

  constructor(private spotifyService: SpotifyLoginService,
              private playlistService: SpotifyPlaylistService,
              public dialog: MatDialog
            ) { }

  ngOnInit() {
    this.getProfile();
    this.getPlaylists();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getPlaylists() {
    this.subscription = this.playlistService.getPlaylists().subscribe(
      playlists => {
         this.playlists = playlists;
      }
    );
  }

  onSelect(playlist: Playlist, index: number) {
    this.selectedPlaylist = playlist;
    this.index = index;
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

  deleteTrack(track) {
    this.playlistService.deleteTrackFromPlaylist(this.selectedPlaylist.id, this.profile.id, track.uri, this.index);
    console.log('Track deleted' + track.uri);
    console.log('selectedPlay' + this.selectedPlaylist.id);
    console.log('Profile' + this.profile.id);
  }

  getProfile() {
    this.subscription = this.spotifyService.getProfile().subscribe(
      profile => {
        this.profile = profile;
     }
    );
  }
}
