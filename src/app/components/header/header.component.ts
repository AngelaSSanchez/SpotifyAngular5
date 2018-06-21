import { Component, OnInit} from '@angular/core';
import { User } from '../../models/user';
import { SpotifyProfileService } from '../../sevices/spotify-profile/spotify-profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userId: string;

  constructor(private spotifyService: SpotifyProfileService) {
    this.userId = localStorage.getItem('user');
  }

  ngOnInit() {
  }

}
