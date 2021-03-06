var BaseCtrl = require('./_base.controller');

ViewCourseCtrl.prototype = Object.create(BaseCtrl.prototype);
function ViewCourseCtrl($state, $window, $location, $stateParams, courseService, scheduleFactory, $analytics) {
  $analytics.pageTrack($location.url());

  BaseCtrl.call(this, $state, $window, scheduleFactory);

  var vm = this;

  vm.selectedCourse = null;
  courseService.addCourseByIdQ($stateParams.id).then(function(course) {
    vm.selectedCourse = course;
  });
}
angular.module('berkeleyScheduler').controller('ViewCourseCtrl', [
  '$state',
  '$window',
  '$location',
  '$stateParams',
  'courseService',
  'scheduleFactory',
  '$analytics',
  ViewCourseCtrl
]);
