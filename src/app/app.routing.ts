import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CallbackComponent } from './callback/callback.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { PlaylistDetailsComponent } from './components/playlists/playlist-details/playlist-details.component';

const ROUTES: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: SignInComponent },
    { path: 'callback', component: CallbackComponent },
    { path: 'playlists', component: PlaylistsComponent},
    { path: 'playlists/:id', component: PlaylistDetailsComponent},
    { path: 'artists/:id', component: ArtistsComponent},
    { path: 'albums/:id', component: AlbumsComponent },
    { path: '**', component: SignInComponent }
];

export const routingModule = RouterModule.forRoot(ROUTES, { useHash: true});
