import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { AreaComponent } from './widgets/area/area.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { CardComponent } from './widgets/card/card.component';
import { PieComponent } from './widgets/pie/pie.component';
import { TableComponent } from './widgets/table/table.component';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    AreaComponent,
    CardComponent,
    PieComponent,
    TableComponent,
    TableComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatInputModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatListModule,
    MatCardModule,
    FlexLayoutModule,
    HighchartsChartModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSortModule,
    MatFormFieldModule,
    FlexLayoutModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    AreaComponent,
    PieComponent,
    TableComponent,
    CardComponent
  ]
})
export class SharedModule { }
