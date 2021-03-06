import angular from "angular";
import _ from "lodash";
import template from "./dashboard-signature-requests.html";

var component = {
	bindings: {
		forms: "<",
		certificationAgreements: "<",
	},
	template: template,
	transclude: true,
	controller: controller,
};

function controller () {
	var $ctrl = this;

	Object.defineProperties($ctrl, {
		allForms: {
			get: function () {
				return $ctrl.forms.reduce(function (output, formGroup) {
					formGroup.items.forEach(function (item) {
						output.push(item);
					})
					return output;
				}, [])
			}
		},
		// relies on only one form type being selectable at once
		selectedForm: {
			get: function () {
				return ($ctrl.selectedIds && $ctrl.selectedIds.length ? (
					$ctrl.forms.find(function (formGroup) {
						return formGroup.items.find(function (form) {
							return form.id === $ctrl.selectedIds[0]
						})
					})
				)
				: null);
			}
		},
		signingDialogTitle: {
			get: function () {
				if (!$ctrl.selectedForm || !$ctrl.selectedIds) return null;
				return ($ctrl.selectedForm.name === 'dmr'
					? $ctrl.selectedIds.length > 1
						? "Sign " + $ctrl.selectedIds.length + " DMRs"
						: "Sign DMR"
					: $ctrl.selectedIds.length > 1
						? "Sign " + $ctrl.selectedIds.length + " instances of <strong>" + $ctrl.selectedForm.displayName + "</strong>"
						: "Sign 1 instance of <strong>" + $ctrl.selectedForm.displayName + "</strong>")
			}
		},
		roleSelectionDialogTitle: {
			get: function () {
				return $ctrl.signingDialogTitle + ' as...'
			}
		}
	})

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
		$ctrl.openSigningRolesDialogEvent = $event;
		$ctrl.selectedForRoleAssignment = {
			formDefinition: $ctrl.selectedForm,
			forms: $ctrl.allForms.filter(function (form) {
				return $ctrl.selectedIds.find(function (id) { return id === form.id });
			})
		}
	}

	$ctrl.onsigningRolesDialogClose = function (results, $event) {
		$ctrl.selectedForRoleAssignment = null;
		$ctrl.selectedForSigning = results;
		$ctrl.openFinalSigningDialogEvent = $event;
	}

	$ctrl.onFinalSigningCancel = function () {
		$ctrl.selectedForSigning = null;
	}

	$ctrl.onFinalSigning = function (signed, $event) {
		$ctrl.openSignatureConfirmationDialogEvent = $event;
		$ctrl.selectedForSigning = null;
		$ctrl.signed = signed.map(function (signedForm) {
			// var outputForm = {
			// 	submissionVersionId: form.submissionVersionId,
			// 	roles: form.roles
			// };
			var outputForm = $ctrl.allForms.find(function (submission) {
				return submission.id === signedForm.submissionVersionId;
			})
			outputForm.roles = signedForm.roles;
			return outputForm;
		})
	}

	$ctrl.onConfirmationClose = function () {
		$ctrl.openSignatureConfirmationDialogEvent = null;
	}

}

angular.module("app").component('dashboardSignatureRequests', component)