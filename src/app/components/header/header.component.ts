import { Component, OnInit, OnChanges} from '@angular/core';
import { User } from '../../models/user';
import { SpotifyProfileService } from '../../sevices/spotify-profile/spotify-profile.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {

  userId: string;
  searchForm: FormGroup;

  searchBy = ['All', 'Artist', 'Album', 'Song'];

  constructor(private spotifyService: SpotifyProfileService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.userId = localStorage.getItem('user');
    this.createForm();
  }

  ngOnInit() {

  }

  createForm() {
    this.searchForm = this.formBuilder.group({
      search: '',
      searchBy: this.searchBy[1]
    });
  }


  ngOnChanges() {
    this.rebuildForm();
  }

  rebuildForm() {
    this.searchForm.reset({
      search: '',
      searchBy: ''
    });
  }

  onSubmit() {
    const formModel = this.searchForm.value;
    const searchChain  = formModel.search;
    const searchByChain  = formModel.searchBy;
    this.rebuildForm();
    this.router.navigate(['/results']);
  }
}
