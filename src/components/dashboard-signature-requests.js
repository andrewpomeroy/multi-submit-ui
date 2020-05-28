import angular from "angular";
import _ from "lodash";
import template from "./dashboard-signature-requests.html";

var component = {
	bindings: {
		forms: "<"
	},
	template: template,
	transclude: true,
	controller: controller,
};

function controller () {
	var $ctrl = this;

	$ctrl.sections = [];

	$ctrl.$onChanges = function (changes) {
		if (changes.forms) {
			// Really dumb manner of merging in new form items and retaining other properties
			$ctrl.sections = changes.forms.currentValue.map(function (formType) {
				var existingSection = ($ctrl.sections.find(function (section) {
					return section.name === formType.name;
				}));
				return {
					name: formType.name,
					displayName: formType.displayName,
					isExpanded: existingSection ? existingSection.isExpanded : true,
					items: formType.items,
				}
			})
		}
	}

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
		return section.items && section.items.every(function (item) {
			return $ctrl.selectedIds.find(function (selectedId) {
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

	$ctrl.openSigningPrompt = function ($event) {
		$ctrl.openSigningModalEvent = $event;
		$ctrl.idsToSign = $ctrl.selectedIds;
		console.log($ctrl.idsToSign);
	}

}

angular.module("app").component('dashboardSignatureRequests', component)