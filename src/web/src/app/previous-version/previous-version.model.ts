import { GroupContent } from 'app/model/group-content';
import { LeafContent } from 'app/model/leaf-content';
import { WholeVersion } from 'app/model/whole-version';
import { Observable } from 'rxjs';

export interface PastGroupContent {
  id: number;
  vid: number;
  name: string;
  realNode: boolean;
  inCurrentVersion: boolean;
  groupContent: PastGroupContent[];
  leafContent: PastLeafContent[];
}

export interface PastLeafContent {
  id: number;
  vid: number;
  name: string;
  valueType: number;
  value: string;
  inCurrentVersion: boolean;
  groupVid: number;
}


export interface PastRadioEvent {
  value: PastGroupContent | PastLeafContent;
  parentId: number;
  parentVid: number;
  kind: 'leaf' | 'group';
}


export interface PreviousUsedGroupsAndLeaves {
  usedGroups: Set<number>;
  usedLeaves: Set<number>;
}

export interface PreviousVersionModalData {
  version: Observable<WholeVersion>;
  currentGroups: GroupContent[];
}

export function groupContentToPrevious(group: GroupContent, usedIds: PreviousUsedGroupsAndLeaves): PastGroupContent {
  return {
    id: group.id,
    vid: group.vid,
    name: group.name,
    realNode: group.realNode,
    inCurrentVersion: usedIds.usedGroups.has(group.id),
    groupContent: group.groupContent.map(g => groupContentToPrevious(g, usedIds)),
    leafContent: group.leafContent.map(l => leafContentToPrevious(l, usedIds)),
  };
}

export function leafContentToPrevious(leaf: LeafContent, usedIds: PreviousUsedGroupsAndLeaves): PastLeafContent {
  return {
    id: leaf.id,
    vid: leaf.vid,
    name: leaf.name,
    valueType: leaf.valueType,
    value: leaf.value,
    inCurrentVersion: usedIds.usedLeaves.has(leaf.id),
    groupVid: leaf.groupVid,
  };
}
