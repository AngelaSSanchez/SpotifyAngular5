export interface Playlist {
    id: string;
    name: string;
    tracks: TrackLink;
}

export interface TrackLink {
    href: string;
}
