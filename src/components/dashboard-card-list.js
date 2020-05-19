import angular from "angular";
import template from "./dashboard-card-list.html";

export default {
	bindings: {
		_list: "<list",
		listName: "@",
		selectContext: "<",
	},
	require: {
		// dashboardCollapseCardList: "?^"
	},
	template: template,
	transclude: true,
	controller: controller
};

function controller () {
	var $ctrl = this;

	function decorateList (list) {
		return list.map(function (listItem) {
			listItem.listName = $ctrl.listName;
			return listItem;
		});
	}

	Object.defineProperties($ctrl, {
		list: {
			get: function () {
				return $ctrl._list;
			}
		}
	});

	$ctrl.$onInit = function () {
	};
	
}
