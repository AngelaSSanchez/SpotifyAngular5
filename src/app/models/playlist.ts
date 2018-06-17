export interface Playlists {
    items: Playlist[];
}

export interface Playlist {
    id: string;
    name: string;
    tracks: TrackLink;
}

export interface TrackLink {
    href: string;
}
