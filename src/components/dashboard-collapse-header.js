import angular from "angular";
import template from "./dashboard-collapse-header.html";

var component = {
	bindings: {
		onToggle: "&",
		isExpanded: "<"
	},
	template: template,
	transclude: true,
	controller: controller
};

controller.$inject = ["$scope"];
function controller ($scope) {
	var $ctrl = this;

	$ctrl.toggleGroup = function ($event) {
		$ctrl.onToggle({});
	};
}

angular.module("app").component('dashboardCollapseHeader', component)