import angular from "angular";
import template from "./dashboard-card-list-item.html";

export default {
	bindings: {
		item: "<",
		isFirst: "<",
		isLast: "<",
		selectContext: "<"
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

	$ctrl.$onInit = function () {
		console.log($ctrl.selectContext);
	};

	Object.defineProperties($ctrl, {
		isSelected: {
			get: function () {
				return $ctrl.selectContext.isSelected($ctrl.item);
			},
			set: function(value) {
				$ctrl.selectContext.toggle($ctrl.item, value);
			}
		}
	});
	
}
