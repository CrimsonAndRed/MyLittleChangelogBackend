import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { GroupContent, Group } from 'app/model/group-content';
import { WholeVersionService } from 'app/page/whole-version/whole-version.service';
import { Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { PreloaderService } from 'app/preloader/preloader.service';

@Component({
  selector: 'version-header',
  templateUrl: './version-header.component.html',
  styleUrls: ['./version-header.component.scss']
})
export class VersionHeaderComponent {

  userGroupIds

  constructor(public wholeVersionService: WholeVersionService,
              private preloaderService: PreloaderService) {}

  handleNewGroup(obs: Observable<Group>): void {
    this.preloaderService.wrap(
      obs
    );
  }

  onPreviousNodeChosen(obs: Observable<void>): void {
    this.preloaderService.wrap(
      obs
    );
  }
}
