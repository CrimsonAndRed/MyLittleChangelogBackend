import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Http } from 'app/http/http.service';
import { EditLeafModalComponent } from './edit-leaf-modal/edit-leaf-modal.component';
import { LeafContent, LeafToUpdate, UpdatedLeaf } from 'app/model/leaf-content';
import { GroupContent } from 'app/model/group-content';

@Component({
  selector: 'edit-leaf-button',
  templateUrl: './edit-leaf-button.component.html',
  styleUrls: ['./edit-leaf-button.component.scss']
})
export class EditLeafButtonComponent {

  @Input() leaf: LeafContent;
  @Input() parentGroup: GroupContent;
  @Output() onUpdateLeaf = new EventEmitter<UpdatedLeaf>();

  constructor(private http: Http, private route: ActivatedRoute, private dialog: MatDialog) {
  }

  onEditButtonClick(): void {
    const dialogRef = this.dialog.open(EditLeafModalComponent, {
      hasBackdrop: true,
      data: this.leaf
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateLeaf(result);
      }
    });

  }

  updateLeaf(leaf: LeafContent): void {
    const versionId = this.route.snapshot.data.version.id;
    const parentId = this.parentGroup.id;
    const leafId = leaf.id;

    const leafToUpdate: LeafToUpdate = {
      name: leaf.name,
      valueType: leaf.valueType,
      value: leaf.value,
      parentVid: this.parentGroup?.vid,
    };
    this.http.put<UpdatedLeaf>(`http://localhost:8080/version/${versionId}/group/${parentId}/leaf/${leafId}`, leafToUpdate)
          .subscribe(updatedLeaf => this.onUpdateLeaf.emit(updatedLeaf));
  }
}