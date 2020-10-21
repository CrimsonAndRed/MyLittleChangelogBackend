import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { WholeVersionComponent } from './whole-version.component';
import { GroupContentComponent } from './group-content/group-content.component';
import { LeafContentComponent } from './leaf-content/leaf-content.component';
import { GroupsLeavesComponent } from './groups-leaves/groups-leaves.component';
import { NewGroupButtonComponent } from './new-group-button/new-group-button.component';
import { NewLeafButtonComponent } from './new-leaf-button/new-leaf-button.component';
import { NewGroupModalComponent } from './group-content/new-group-modal/new-group-modal.component';
import { NewLeafModalComponent } from './leaf-content/new-leaf-modal/new-leaf-modal.component';
import { EditLeafModalComponent } from './leaf-content/edit-leaf-modal/edit-leaf-modal.component';
import { EditGroupModalComponent } from './edit-group-button/edit-group-modal/edit-group-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { FromPastGroupsButton } from './past-groups/from-past-groups-button/from-past-groups-button.component';
import { FromPastGroupsModal } from './past-groups/from-past-groups-modal/from-past-groups-modal.component';
import { PastGroup } from './past-groups/from-past-groups-modal/past-group/past-group.component';
import { PastLeaf } from './past-groups/from-past-groups-modal/past-leaf/past-leaf.component';

import { HttpClientModule } from '@angular/common/http';

import { GroupsSecModule } from 'app/groups-sec/groups-sec.module';
import { VersionHeaderComponent } from './version-header/version-header.component';
import { GroupHeaderComponent } from './group-header/group-header.component';
import { DeleteGroupButtonComponent } from './delete-group-button/delete-group-button.component';
import { EditGroupButtonComponent } from './edit-group-button/edit-group-button.component';

@NgModule({
  declarations: [
    WholeVersionComponent,
    GroupContentComponent,
    LeafContentComponent,
    GroupsLeavesComponent,
    NewGroupButtonComponent,
    NewLeafButtonComponent,
    NewGroupModalComponent,
    NewLeafModalComponent,
    EditLeafModalComponent,
    EditGroupModalComponent,
    FromPastGroupsModal,
    FromPastGroupsButton,
    PastGroup,
    PastLeaf,

    VersionHeaderComponent,
    GroupHeaderComponent,
    DeleteGroupButtonComponent,
    EditGroupButtonComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    MatDialogModule,
    MatSelectModule,
    GroupsSecModule,
  ],
})
export class WholeVersionModule { }
