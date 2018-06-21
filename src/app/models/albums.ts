import { Images } from "./images";
import { Artist } from "./artists";
import { Tracks } from "./track";

export class Albums {
    items: Album[];
}

export class Album {
    id: string;
    name: string;
    release_date: string;
    tracks: Tracks;
    artists: Artist[];
    images: Images[];
}
