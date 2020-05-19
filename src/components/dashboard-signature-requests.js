import angular from "angular";
import _ from "lodash";
import template from "./dashboard-signature-requests.html";

export default {
	bindings: {
		forms: "<"
	},
	template: template,
	transclude: true,
	controller: controller,
};

function controller () {
	var $ctrl = this;

	$ctrl.$onInit = function () {
		$ctrl.sections = {
			dmr: {
				isExpanded: true,
				items: $ctrl.forms.dmr
			}
		};
	};

	$ctrl.selectedIds = [];

	$ctrl.isSelected = function (item) {
		return Boolean($ctrl.selectedIds.find(function (id) {
			return id === item.id;
		}));
	};

	function _toggle (array, value) {
		var index = array.findIndex(function (item) {
			return item === value;
		});
		if (index !== -1) {
			array.splice(index, 1);
		}	
		else {
			array.push(value);
		}
	}

	$ctrl.toggle = function (item, bool) {
		_toggle($ctrl.selectedIds, item.id);
	};

}
