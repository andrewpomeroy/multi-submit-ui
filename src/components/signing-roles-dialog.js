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
					bindToController: true,
					controllerAs: "$ctrl",
					controller: [
						"$scope",
						"$mdDialog",
						"$element",
						"toSign",
						function signingRolesDialogCtrlInner($scope, $mdDialog, $element, toSign) {
							var $ctrl = this;

							if (!$ctrl.openEvent) {
								console.warn("No `open-event` specified for signingRolesDialog. This is necessary for accessibility.", $element);
							}
							if ($ctrl.openEvent && !$ctrl.openEvent.target) {
								console.warn("Invalid `open-event` specified for signingRolesDialog. This is necessary for accessibility.", $element);
							}

							$ctrl.toSign = toSign;

							// Assumes one form type per signing
							$ctrl.roles = $ctrl.toSign.forms[0].roles;

							$ctrl.titleString = ($ctrl.toSign.formDefinition.name === 'dmr' 
								? $ctrl.toSign.forms.length > 1
									? "Sign " + $ctrl.toSign.forms.length + " DMRs as..."
									: "Sign DMR as..."
								: $ctrl.toSign.forms.length > 1
									? "Sign " + $ctrl.toSign.forms.length + " instances of <strong>" + $ctrl.toSign.formDefinition.displayName + "</strong> as..."
									: "Sign 1 instance of <strong>" + $ctrl.toSign.formDefinition.displayName + "</strong> as...")

							$ctrl.close = function () {
							  $mdDialog.hide();
							};
							$ctrl.cancel = function () {
							  $mdDialog.cancel();
							};

							$ctrl.$onInit = function () {
							}

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