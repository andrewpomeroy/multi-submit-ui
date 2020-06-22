import angular from "angular";
import template from "./dashboard-card-list-item.html";

var component = {
	bindings: {
		item: "<",
		isFirst: "<",
		isLast: "<",
		selectContext: "<",
		isSelectable: "<",
		showSelectBox: "<"
	},
	require: {
		dashboardCardList: "?^"
	},
	template: template,
	transclude: true,
	controller: controller
};

controller.$inject = ['$attrs']
function controller ($attrs) {
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

	$ctrl.$onInit = function () {
		if ($attrs.showSelectBox === undefined) {
			$ctrl.showSelectBox = true;
		}
	}
	
}

angular.module("app").component('dashboardCardListItem', component)