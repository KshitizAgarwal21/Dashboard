import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { DefaultComponent } from './default.component';
import { DatabaseComponent } from 'src/app/modules/database/database.component';
import { RouterModule } from '@angular/router';
import { PostsComponent } from 'src/app/modules/posts/posts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule }from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginatorModule} from '@angular/material/paginator';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UpdateComponent } from './login/update/update.component';

@NgModule({
  declarations: [
    DefaultComponent, 
    DashboardComponent,
    PostsComponent,
    LoginComponent,
    DatabaseComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    MatSidenavModule,
    MatDividerModule,
    MatSnackBarModule,
    MatCardModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    FlexLayoutModule
  ]
})
export class DefaultModule { }
