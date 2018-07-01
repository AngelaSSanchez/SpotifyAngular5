import { Directive, ElementRef, OnInit, Input, OnChanges, HostListener, OnDestroy } from '@angular/core';
import { SpotifyFollowService } from '../sevices/spotify-follow/spotify-follow.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appFollowing]',
})
export class FollowingDirective implements OnChanges, OnDestroy {

  @Input() id: string;

  subscription: Subscription;

  constructor(private followService: SpotifyFollowService,
              private el: ElementRef) {
               }

  @HostListener('click') onclick() {
    this.subscription = this.followService.followArtists(this.id).subscribe(
      data => {
        this.checkFollowingArtist();
      }
    );
  }

  ngOnChanges() {
    this.checkFollowingArtist();
  }

  checkFollowingArtist() {
    if (this.id != null) {
      this.subscription = this.followService.checkFollowingArtist(this.id).subscribe(
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
