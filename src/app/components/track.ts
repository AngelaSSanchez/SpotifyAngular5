export class Tracks {
    items: Track[];
}

export class Track {
    id: string;
    name: string;
    preview_url: string;
    uri: string;
    duration_ms: number;
}

export class PlayTrack {
    uris: string[];

    constructor() {
        this.uris = [];
    }
}

export class Profile {
    id: string;
}
