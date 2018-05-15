import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CallbackComponent } from './callback/callback.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { AlbumsComponent } from './components/albums/albums.component';

const ROUTES: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: SignInComponent },
    { path: 'callback', component: CallbackComponent },
    { path: 'artists/:id', component: ArtistsComponent },
    { path: 'albums/:id', component: AlbumsComponent },
    { path: 'playlists', component: PlaylistsComponent }
];

export const routing = RouterModule.forRoot(ROUTES, { useHash: true});
