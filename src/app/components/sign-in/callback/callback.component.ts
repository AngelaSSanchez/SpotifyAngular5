import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SpotifyProfileService } from '../../../sevices/spotify-profile/spotify-profile.service';
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
    this.route.navigate(['/results']);
  }

  async getUser() {
     this.user = await this.serviceProfile.getUser();

     localStorage.setItem('user', this.user.id);
  }

}
