import angular from "angular";
import template from "./dashboard-collapse-card-list.html";

var component = {
	bindings: {
		list: "<",
		isExpanded: "<"
	},
	template: template,
	transclude: true
};

angular.module("app").component('dashboardCollapseCardList', component)