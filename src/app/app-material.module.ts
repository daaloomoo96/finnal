import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatButtonModule,
    MatExpansionModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatPaginatorModule,
    MatTabsModule
  ],
  exports: [
    MatStepperModule,
    MatFormFieldModule,
    MatButtonModule,
    MatExpansionModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatPaginatorModule,
    MatTabsModule
  ],
  providers:[MatMomentDateModule]
})
export class AppMaterialModule { }
