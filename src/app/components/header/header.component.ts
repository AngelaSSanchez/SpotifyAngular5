import { Component, OnInit, OnChanges} from '@angular/core';
import { User } from '../../models/user';
import { SpotifyProfileService } from '../../sevices/spotify-profile/spotify-profile.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {

  userId: string;
  searchForm: FormGroup;

  searchBy = ['all', 'artist', 'album', 'track'];

  constructor(private spotifyService: SpotifyProfileService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.userId = localStorage.getItem('user');
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required],
      searchBy: this.searchBy[0]
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
    let searchByChain = '';
    if (formModel.searchBy === 'all') {
      for (let _i = 1; _i < this.searchBy.length; _i++) {
        searchByChain += this.searchBy[_i];
        if (_i !== this.searchBy.length - 1) {
          searchByChain += ',';
        }
      }
    } else {
      searchByChain  = formModel.searchBy;
    }
    this.rebuildForm();
    this.router.navigate(['/results', {q: searchChain, type: searchByChain}]);
  }
}
