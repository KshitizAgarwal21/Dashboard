import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { LoginComponent } from './layouts/default/login/login.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { DatabaseComponent } from './modules/database/database.component';
import { PostsComponent } from './modules/posts/posts.component';
import { UploadComponent } from './modules/upload/upload.component';

const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children:[{
    path:'',
    component: DashboardComponent
  },
  {
    path: 'post',
    component: PostsComponent
  },
{
  path:'database',
  component: DatabaseComponent
},
{
  path: 'changepic',
  component: UploadComponent
}]
},
{
  path:'login',
  component:LoginComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
