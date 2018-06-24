import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CallbackComponent } from './components/sign-in/callback/callback.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { PlaylistDetailsComponent } from './components/playlists/playlist-details/playlist-details.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { HeaderComponent } from './components/header/header.component';

const ROUTES: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: SignInComponent },
    { path: 'callback', component: CallbackComponent },
    { path: 'playlist/:id', component: PlaylistDetailsComponent},
    { path: 'artists/:id', component: ArtistsComponent},
    { path: 'albums/:id', component: AlbumsComponent },
    { path: 'results', component: SearchResultsComponent },
    { path: '**', component: SignInComponent }
];

export const routingModule = RouterModule.forRoot(ROUTES, { useHash: true});
