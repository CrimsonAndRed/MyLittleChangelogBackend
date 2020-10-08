import { Component, Input, Output } from '@angular/core';

import { GroupContent } from 'app/model/group-content';
import { Http } from 'app/http/http.service';
import { NewLeafWithId, NewLeaf} from 'app/model/new-leaf';
import { ActivatedRoute } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { NewLeafModalComponent } from './new-leaf-modal/new-leaf-modal.component';

@Component({
  selector: 'new-leaf-button',
  templateUrl: './new-leaf-button.component.html',
  styleUrls: ['./new-leaf-button.component.scss']
})
export class NewLeafButtonComponent {

  @Output() onNewLeaf = new EventEmitter<NewLeafWithId>();

  @Input() groupContent: GroupContent;

  constructor(private http: Http, private route: ActivatedRoute, private dialog: MatDialog) {
  }

  onNewLeafButtonClick() {

    const dialogRef = this.dialog.open(NewLeafModalComponent, {
      hasBackdrop: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createNewLeaf(result);
      }
    });

  }

  createNewLeaf(newLeaf: NewLeaf) {
    const versionId = this.route.snapshot.data.version.id;
    const groupId = this.groupContent === null ? null : this.groupContent.id;

    this.http.post<NewLeafWithId>(`http://localhost:8080/version/${versionId}/group/${groupId}/leaf`, newLeaf)
          .subscribe(newLeaf =>this.onNewLeaf.emit(newLeaf));
  }

}
