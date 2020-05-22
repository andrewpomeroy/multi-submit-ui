import angular from "angular";
import template from "./dashboard-card-list-item.html";

var component = {
	bindings: {
		item: "<",
		isFirst: "<",
		isLast: "<",
		selectContext: "<",
		isSelectable: "<"
	},
	require: {
		dashboardCardList: "?^"
	},
	template: template,
	transclude: true,
	controller: controller
};

function controller () {
	var $ctrl = this;

	Object.defineProperties($ctrl, {
		isSelected: {
			get: function () {
				return $ctrl.selectContext.isSelected($ctrl.item);
			},
			set: function(value) {
				$ctrl.selectContext.toggleItem($ctrl.item, value);
			}
		}
	});
	
}

angular.module("app").component('dashboardCardListItem', component)