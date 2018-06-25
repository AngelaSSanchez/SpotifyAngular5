import { Directive, ElementRef, OnInit, Input, OnChanges } from '@angular/core';
import { SpotifyArtistsService } from '../sevices/spotify-artist/spotify-artists.service';

@Directive({
  selector: '[appFollowing]',
  providers: [SpotifyArtistsService]
})
export class FollowingDirective  implements OnChanges {

  @Input() id: string;
  constructor(private artistService: SpotifyArtistsService,
              private el: ElementRef) {
               }

  ngOnChanges() {
    if (this.id != null) {
      this.artistService.checkFollowingArtist(this.id).subscribe(
        following => {
          const follow = following[0];
          if (follow === true) {
            return this.el.nativeElement.value = 'Following';
          } else {
            return this.el.nativeElement.value = 'Follow';
          }
        }
      );
    }
  }
}
