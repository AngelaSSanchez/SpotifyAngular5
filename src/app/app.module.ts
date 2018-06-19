import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { routingModule } from './app.routing';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { SpotifyLoginService } from './sevices/spotify-login/spotify-login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CallbackComponent } from './callback/callback.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { SignInComponent } from './sign-in/sign-in.component';
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { PlaylistDetailsComponent } from './components/playlists/playlist-details/playlist-details.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { CreatePlaylistComponent } from './components/playlists/create-playlist/create-playlist.component';
import { MaterialModule } from './material-module/material-module.module';
import { HeaderComponent } from './components/header/header.component';
import { AlbumDetailsComponent } from './components/albums/album-details/album-details.component';
import { SpotifyProfileService } from './sevices/spotify-profile/spotify-profile.service';
import { UserComponent } from './components/header/user/user.component';
import { FollowingComponent } from './components/header/user/following/following.component';
import { UserRoutingModule } from './components/header/user-routing/user-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    SignInComponent,
    PlaylistsComponent,
    PlaylistDetailsComponent,
    AlbumsComponent,
    ArtistsComponent,
    CreatePlaylistComponent,
    HeaderComponent,
    AlbumDetailsComponent,
    UserComponent,
    FollowingComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    routingModule
  ],
  providers: [
    SpotifyLoginService,
    SpotifyProfileService,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  entryComponents: [PlaylistsComponent, CreatePlaylistComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
