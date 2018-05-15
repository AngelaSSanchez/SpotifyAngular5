import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { routing } from './app.routing';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { SpotifyLoginService } from './spotify-login.service';

import { AppComponent } from './app.component';
import { CallbackComponent } from './callback/callback.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { SignInComponent } from './sign-in/sign-in.component';
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { PlaylistDetailsComponent } from './components/playlists/playlist-details/playlist-details.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { ArtistsComponent } from './components/artists/artists.component';

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    SignInComponent,
    PlaylistsComponent,
    PlaylistDetailsComponent,
    AlbumsComponent,
    ArtistsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    routing
  ],
  providers: [
    SpotifyLoginService,
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
  bootstrap: [AppComponent]
})
export class AppModule { }
