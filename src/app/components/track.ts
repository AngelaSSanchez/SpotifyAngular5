export class Tracks {
    items: Track[];
}

export class Track {
    id: string;
    name: string;
    preview_url: string;
    uri: string;
}

export class PlayTrack {
    uris: string[];

    constructor() {
        this.uris = [];
    }
}
