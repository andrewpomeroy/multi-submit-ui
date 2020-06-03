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

							$ctrl.roles = $ctrl.toSign.formDefinition.roles;

							$ctrl.model = $ctrl.toSign.forms.map(function (form) {
								return form.certifications.map(function (cert) {
									return {
										value: false,
										certifiedDate: cert.certifiedDate,
										certifierName: cert.certifierName,
										isCertified: Boolean(cert.certifiedDate && cert.certifierName),
										hoverText: (cert.certifiedDate && cert.certifierName
											? "Signed by " + cert.certifierName + " on " + cert.certifiedDate
											: "")
									}
								})
							})

							$ctrl.isColumnActionable = function (colIndex) {
								return !$ctrl.model.every(function (row) {
									return row[colIndex].isCertified
								})
							}

							$ctrl.isColumnAllSelected = function (colIndex) {
								if (!$ctrl.isColumnActionable(colIndex)) return false;
								return $ctrl.model.every(function (row) {
									return row[colIndex].value || row[colIndex].isCertified
								})
							}

							$ctrl.selectColumn = function (colIndex) {
								var val = !$ctrl.isColumnAllSelected(colIndex);
								$ctrl.model.forEach(function (row) {
									if (!row[colIndex].isCertified) {
										row[colIndex].value = val;
									}
								})
							}

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
						toSign: $ctrl.toSign,
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