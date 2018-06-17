import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from '../user/user.component';
import { FollowingComponent } from '../user/following/following.component';

const userRoutes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    children: [
      {
         path: 'following',
            component: FollowingComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule { }
