/* global angular:true */
(function (global, angular, undefined) {
	"use strict";

	angular.module("app").directive("dashboardSection", [
		"$state",
		function ($state) {
			return {
				restrict: "E",
				bindToController: true,
				controllerAs: "$ctrl",
				scope: {
					name: "@",
					titleSref: "@",
				},
				transclude: true,
				template:
					"<div class=\"Dashboard-section\">" +
					"<div class=\"Dashboard-section-title\" ng-if=\"$ctrl.name\" ng-class=\"{'Dashboard-section-title--linked': $ctrl.titleSref}\" ng-click=\"$ctrl.titleSref ? $ctrl.go($ctrl.titleSref) : return\" >" +
					"<h5 class=\"u-headingInherit\" ng-bind=\"$ctrl.name\"></h5>" +
					"</div>" +
					"<div ng-transclude></div>" +
					"</div>",
				controller: [
					"$scope",
					"$state",
					function ($scope, $state) {
						var $ctrl = this;
						this.go = $state.go;
					},
				],
			};
		},
	]);
})(this, angular);
