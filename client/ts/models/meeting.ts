'use strict';
import Time = require('./time');
import {Days, Identifiable, generateRandomAlphaNumericId, getDefaultDays} from '../utils';

declare interface Instructor {
  name: string
}

export default class Meeting<Owner> implements Identifiable {
  public id: string;

  constructor(
      public startTime: Time = Time.noon,
      public endTime: Time = Time.noon,
      public days: Days<boolean> = getDefaultDays<boolean>(() => false),
      public location: string = '',
      public instructors: Instructor[] = [],
      public owner: Owner
  ) {
    this.id = generateRandomAlphaNumericId(10);
  }

  static parse<Owner>(meetingJson: any, owner: Owner): Meeting<Owner> {
    let location = undefined;
    if (meetingJson.location) {
      location = meetingJson.location.description || null;
    }

    if (meetingJson.startTime === null || meetingJson.endTime === null) {
      return new Meeting(undefined, undefined, meetingJson.days, location, meetingJson.instructors, owner);
    }
    const startTimeSplit = meetingJson.startTime.split(':');
    const startTime = new Time(parseInt(startTimeSplit[0]), parseInt(startTimeSplit[1]));
    const endTimeSplit = meetingJson.endTime.split(':');
    const endTime = new Time(parseInt(endTimeSplit[0]), parseInt(endTimeSplit[1]));

    return new Meeting<Owner>(startTime, endTime, meetingJson.days, location, meetingJson.instructors, owner);
  };

  static dayAbbrevs = [
    ['Monday', 'M'],
    ['Tuesday', 'T'],
    ['Wednesday', 'W'],
    ['Thursday', 'R'],
    ['Friday', 'F']
  ];

  getTotalMinutes(): number {
    return this.endTime.getTotalMinutes() - this.startTime.getTotalMinutes();
  };

  getDayList(): string[] {
    return Object.keys(this.days).filter(function (day) {
      return this.days[day];
    }, this);
  };

  toString() {
    let dayAbbrev = '';
    Meeting.dayAbbrevs.forEach(function (day) {
      if (this.days[day[0]]) {
        dayAbbrev += day[1];
      }
    }, this);
    if (this.startTime == null || this.endTime == null) {
      return dayAbbrev;
    }
    return dayAbbrev + ' ' + this.startTime.toString() + ' - ' + this.endTime.toString();
  };
}
