import angular from "angular";
import template from "./signing-roles-dialog.html";

var signingRolesDialog = {
	bindings: {
		openEvent: "<",
		onClose: "<",
		toSign: "<",
	},
	controller: signingRolesDialogCtrl
};

signingRolesDialogCtrl.$inject = ["$mdDialog"]
function signingRolesDialogCtrl($mdDialog) {
	var $ctrl = this;

	$ctrl.$onChanges = function (changes) {
		console.log(changes);
		if (changes.toSign && changes.toSign.currentValue && changes.toSign.currentValue.forms && changes.toSign.currentValue.forms.length) {
			// Initialize dialog

			$mdDialog
				.show({
					targetEvent: $ctrl.openEvent,
					closeTo: $ctrl.openEvent ? $ctrl.openEvent.target : undefined,
					clickOutsideToClose: true,
					controller: [
						"$scope",
						"$mdDialog",
						"toSign",
						function reassignDialogCtrl($scope, $mdDialog, toSign) {
							if (!$ctrl.openEvent) {
								console.warn("No `open-event` specified for modalSelectMenu. This is necessary for accessibility.", $element);
							}
							if ($ctrl.openEvent && !$ctrl.openEvent.target) {
								console.warn("Invalid `open-event` specified for modalSelectMenu. This is necessary for accessibility.", $element);
							}
							$scope.toSign = toSign;

							$scope.close = () => $mdDialog.hide();
						},
					],
					template: template,
					locals: {
						toSign: $ctrl.toSign
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