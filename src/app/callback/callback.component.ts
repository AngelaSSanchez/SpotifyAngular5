import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SpotifyProfileService } from '../sevices/spotify-profile/spotify-profile.service';
import { Profile } from '../models/profile';
@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  token: string;
  user: any;
  constructor(private route: Router,
              private serviceProfile: SpotifyProfileService) { }

  ngOnInit() {
    this.getAccessToken();
  }

  getParameterByName(name) {
    const match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }

  getAccessToken() {
    this.token = this.getParameterByName('access_token');
    localStorage.setItem('token', this.token);
    this.getUser();
    console.log(localStorage.getItem('user'));
    this.route.navigate(['/playlists']);
  }

  async getUser() {
     this.user = await this.serviceProfile.getUser();

     console.log(this.user);
     localStorage.setItem('user', this.user.id);
  }

}
