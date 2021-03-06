'use strict';

import Meeting from './meeting';
import Time = require('./time');
import {Option} from './commitment';


export class MeetingView {
  group: ScheduleMeetingGroup;
  day: string;
  slotIdx: number;

  private _meeting: Meeting<Option>;

  constructor(
      meetingGroup: ScheduleMeetingGroup,
      meeting: Meeting<Option>,
      slotIdx: number = -1
  ) {
    this.group = meetingGroup;
    this._meeting = meeting;
    this.day = this.group.day;
    this.slotIdx = slotIdx;
  }

  get owner(): any {
    return this._meeting.owner;
  }

  get startTime(): Time {
    return this._meeting.startTime;
  }

  get endTime(): Time {
    return this._meeting.endTime;
  }

  get totalMinutes(): number {
    return this._meeting.getTotalMinutes();
  }

  get location(): string {
    return this._meeting.location;
  }

  get instructors(): Object[] {
    return this._meeting.instructors;
  }
}

export default class ScheduleMeetingGroup {
  day: string;
  slots: MeetingView[][];

  constructor(meeting: Meeting<Option>, day: string) {
    this.day = day;
    this.slots = [];
    this.add(meeting);
  }

  hasOverlap(meeting: Meeting<Option>) {
    const meetingView = new MeetingView(this, meeting);
    for (let j = 0; j < this.slots.length; j++) {
      const slot = this.slots[j];
      if (slot[slot.length - 1].endTime.compareTo(meetingView.startTime) > 0) {
        return true;
      }
    }
    return false;
  }

  add(meeting: Meeting<Option>) {
    const meetingView = new MeetingView(this, meeting);
    for (let i = 0; i < this.slots.length; i++) {
      const slot: MeetingView[] = this.slots[i];
      if (slot[slot.length - 1].endTime.compareTo(meetingView.startTime) < 0) {
        slot.push(meetingView);
        meetingView.slotIdx = i;
        return;
      }
    }
    this.slots.push([meetingView]);
    meetingView.slotIdx = this.slots.length - 1;
  }

  getMeetingViews() {
    return this.slots.reduce(function(a, b) {
      return a.concat(b);
    }, []);
  };
}
