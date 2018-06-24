import { Images } from './images';

export class Artists {
    items: Artist[];
    limit: number;
}

export class Artist {
    id: string;
    name: string;
    genres: string[];
    images: Images[];
}
