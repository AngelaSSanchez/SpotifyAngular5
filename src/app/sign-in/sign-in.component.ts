import { Component, OnInit } from '@angular/core';
import { SpotifyLoginService } from '../sevices/spotify-login/spotify-login.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  url: string;

    constructor(public spotifyService: SpotifyLoginService) {}

    ngOnInit() {
      this.url = this.spotifyService.getUrl();
    }
}
