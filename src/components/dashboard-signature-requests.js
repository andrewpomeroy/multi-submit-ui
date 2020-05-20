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
		$ctrl.sections = [
			{
				name: "dmr",
				displayName: "DMRs",
				isExpanded: true,
				items: $ctrl.forms.dmr
			},
			{
				name: "other",
				displayName: "Other Form",
				isExpanded: true,
				items: $ctrl.forms.other
			}
		];
	};

	$ctrl.selectedIds = [];

	$ctrl.isSelected = function (item) {
		return Boolean($ctrl.selectedIds.find(function (id) {
			return id === item.id;
		}));
	};

	$ctrl.isSelectable = function (listName) {
		if (!$ctrl.selectedIds.length) return true;

		// There is not a currently-selected ID which..
		return !$ctrl.selectedIds.find(function (selectedId) {
			// .. among all the sections ..
			return $ctrl.sections.find(function (section) {
				// .. can be found in any section other than the passed-in section.
				return section.name !== listName && section.items.find(function (sectionItem) {
					return sectionItem.id === selectedId;
				});
			});
		});
	};

	function _toggleItem (array, value) {
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

	$ctrl.toggleItem = function (item, bool) {
		_toggleItem($ctrl.selectedIds, item.id);
	};

	$ctrl.areAllSelected = function (section) {
		return section.items.every(function (item) {
			return $ctrl.selectedIds.find(function (selectedId) {
				console.log(selectedId, item.id);
				return selectedId === item.id;
			});
		});
	};
	
	$ctrl.selectAll = function (section) {
		var deselecting = $ctrl.areAllSelected(section);
		if (deselecting) {
			$ctrl.selectedIds = [];
		}
		else {
			$ctrl.selectedIds = section.items.map(function (item) { return item.id; });
		}
	};

	$ctrl.toggleGroup = function (name) {
		var section = $ctrl.sections.find(function (section) {
			return section.name === name;
		});
		section.isExpanded = !section.isExpanded;
	};

}
