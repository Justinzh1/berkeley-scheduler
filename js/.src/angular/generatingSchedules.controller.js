var BaseCtrl = require('./_base.controller');

GeneratingSchedulesCtrl.prototype = Object.create(BaseCtrl.prototype);
function GeneratingSchedulesCtrl($state, $window, $httpParamSerializer, $stateParams, $q, scheduleFactory, $analytics) {
  $analytics.pageTrack(
    '/schedule/generate?{}'.replace('{}', $httpParamSerializer($stateParams)));

  BaseCtrl.call(this, $state, $window);

  var vm = this;

  vm.scheduleGenerationStatus = scheduleFactory.getScheduleGenerationStatus();
  scheduleFactory.registerScheduleGenerationStatusListener('generatingSchedules', function(scheduleGenerationStatus) {
    vm.scheduleGenerationStatus = scheduleGenerationStatus;

    if (vm.scheduleGenerationStatus.status === 'done'
        && $state.includes('schedule.generatingSchedules')) {
      vm.goToState('schedule.viewSchedule', {
        scheduleId: startScheduleId || scheduleFactory.getCurrScheduleId()
      });
    }
  });

  var deferred = $q.defer();
  var scheduleGroupId = $stateParams.scheduleGroupId;
  var startScheduleId = $stateParams.startScheduleId;
  if (scheduleGroupId) {
    deferred.resolve(scheduleFactory.setCurrentScheduleGroupById(scheduleGroupId));
  } else if (startScheduleId) {
    deferred.resolve(scheduleFactory.setCurrentScheduleGroupByScheduleIdQ(startScheduleId));
  }

  deferred.promise.then(function() {
    scheduleFactory.generateSchedulesQ().then(function() {
      scheduleFactory.filterAndReorderSchedules();
    })
  });

}
angular.module('scheduleBuilder').controller('GeneratingSchedulesCtrl', [
  '$state',
  '$window',
  '$httpParamSerializer',
  '$stateParams',
  '$q',
  'scheduleFactory',
  '$analytics',
  GeneratingSchedulesCtrl
]);