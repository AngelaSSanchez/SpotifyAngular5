import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  token: string;
  constructor(private route: Router) { }

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
    this.route.navigate(['/playlists']);
  }

}
