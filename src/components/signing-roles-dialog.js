import angular from "angular";
import template from "./signing-roles-dialog.html";

var signingRolesDialog = {
	bindings: {
		openEvent: "<",
		forms: "<",
		onClose: "<",
	},
	controller: signingRolesDialogCtrl
};

signingRolesDialogCtrl.$inject = ["$mdDialog"]
function signingRolesDialogCtrl($mdDialog) {
	var $ctrl = this;

	console.log($ctrl.forms);

	$ctrl.$onChanges = function (changes) {
		console.log(changes);
		if (changes.forms && changes.forms.currentValue && changes.forms.currentValue.length) {
			// Initialize dialog

			$mdDialog
				.show({
					targetEvent: $ctrl.openEvent,
					closeTo: $ctrl.openEvent ? $ctrl.openEvent.target : undefined,
					clickOutsideToClose: true,
					controller: [
						"$scope",
						"$mdDialog",
						"forms",
						function reassignDialogCtrl($scope, $mdDialog, forms) {
							if (!$ctrl.openEvent) {
								console.warn("No `open-event` specified for modalSelectMenu. This is necessary for accessibility.", $element);
							}
							if ($ctrl.openEvent && !$ctrl.openEvent.target) {
								console.warn("Invalid `open-event` specified for modalSelectMenu. This is necessary for accessibility.", $element);
							}
							$scope.forms = forms;

							$scope.close = () => $mdDialog.hide();
						},
					],
					template: template,
					locals: {
						forms: $ctrl.forms
					},
					onRemoving: () => {
						$ctrl.onClose();
					},
				})
				.finally(() => { });
		}
	}

}

console.log(signingRolesDialog);

console.log(angular.module("app").component('signingRolesDialog', signingRolesDialog))