import angular = require('angular');

import Schedule from '../models/schedule';
import {SchedulingOptions} from './user.service';


declare interface IScheduleService {
  setStale(stale?: boolean): void;
  getScheduleQById(scheduleId: string): angular.IPromise<Schedule>;
  getSchedulingOptions(): SchedulingOptions;
}

export = IScheduleService;
