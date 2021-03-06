import angular from "angular";
import template from "./dashboard-collapse-list-contents.html";

var component = {
	bindings: {
	},
	require: {
		dashboardCollapseCardList: "?^dashboardCollapseCardList"
	},
	template: template,
	transclude: true,
	controller: controller
};

function controller () {
	var $ctrl = this;
	Object.defineProperties($ctrl, {
		isActive: {
			get: function () {
				return $ctrl.dashboardCollapseCardList.list.isExpanded;
			}
		}
	});
}

angular.module("app").component('dashboardCollapseListContents', component)