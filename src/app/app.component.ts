import { Component, OnInit } from '@angular/core';
import { SpotifyLoginService } from './spotify-login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  url: string;

  constructor(public spotifyService: SpotifyLoginService) {}

  ngOnInit() {
    this.url = this.spotifyService.getUrl();
  }

}
