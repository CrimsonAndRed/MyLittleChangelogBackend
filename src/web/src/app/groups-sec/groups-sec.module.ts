import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';

import { GroupsSecComponent } from './groups-sec.component';
import { GroupLeavesSecComponent } from './group-leaves-sec/group-leaves-sec.component';
import { LeafContentSecComponent } from './leaf-content-sec/leaf-content-sec.component';
import { GroupContentSecComponent } from './group-content-sec/group-content-sec.component';
import { ExpandOneButtonComponent } from './expand-one-button/expand-one-button.component';
import { ExpandAllButtonComponent } from './expand-all-button/expand-all-button.component';
import { GlobalHeader } from './groups-sec.directive';
import { GroupHeaderDr } from './groups-sec.directive';
import { LeafHeaderDr } from './groups-sec.directive';

@NgModule({
  declarations: [
    GroupsSecComponent,
    GroupLeavesSecComponent,
    LeafContentSecComponent,
    GroupContentSecComponent,
    ExpandOneButtonComponent,
    ExpandAllButtonComponent,
    GlobalHeader,
    GroupHeaderDr,
    LeafHeaderDr,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    MatSelectModule,
  ],
  exports: [
    GroupsSecComponent,
    GlobalHeader,
  ]
})
export class GroupsSecModule { }