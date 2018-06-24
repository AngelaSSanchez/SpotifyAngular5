import { Images } from './images';

export interface Playlists {
    items: Playlist[];
}

export interface Playlist {
    id: string;
    name: string;
    images: Images[];
    tracks: TrackLink;
}

export interface TrackLink {
    href: string;
}
