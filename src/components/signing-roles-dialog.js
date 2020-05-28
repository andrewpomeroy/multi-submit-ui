import angular from "angular";
import template from "./signing-roles-dialog.html";

var signingRolesDialog = {
	bindings: {
		openEvent: "<",
		formIds: "<",
	},
	template: template,
	controller: controller
};

controller.$inject = ["$mdDialog"]
function controller($mdDialog) {
	var $ctrl = this;

	$ctrl.$onChanges = changes => {
		console.log(changes);
		if (changes.formIds && changes.formIds.currentValue && changes.formIds.currentValue.length) {
			// Initialize dialog

			$mdDialog
				.show({
					targetEvent: $ctrl.openEvent,
					closeTo: $ctrl.openEvent ? $ctrl.openEvent.target : undefined,
					clickOutsideToClose: true,
					controller: [
						"$scope",
						"$mdDialog",
						"formIds",
						function reassignDialogCtrl($scope, $mdDialog, formIds) {
							if (!$ctrl.openEvent) {
								console.warn("No `open-event` specified for modalSelectMenu. This is necessary for accessibility.", $element);
							}
							if ($ctrl.openEvent && !$ctrl.openEvent.target) {
								console.warn("Invalid `open-event` specified for modalSelectMenu. This is necessary for accessibility.", $element);
							}
							$scope.formIds = formIds;

							$scope.close = () => $mdDialog.hide();
						},
					],
					template: template,
					locals: {
						formIds: $ctrl.formIds
					},
					onRemoving: () => {
						// $ctrl.onSelect($ctrl._selectedItem);
					},
				})
				.finally(() => { });
		}
	}

}

angular.module("app").component('signingRolesDialog', signingRolesDialog);