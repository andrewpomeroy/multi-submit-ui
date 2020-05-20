import angular from "angular";
import template from "./dashboard-card-list.html";

export default {
	bindings: {
		list: "<",
		listName: "@",
		selectContext: "<",
		isSelectable: "<"
	},
	template: template,
	transclude: true,
	controller: controller
};

function controller () {
	var $ctrl = this;

	$ctrl.$onInit = function () {
	};
	
}
