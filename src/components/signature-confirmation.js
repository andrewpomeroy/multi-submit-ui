import angular from "angular";
import template from "./signature-confirmation.html";

var signatureConfirmation = {
	bindings: {
		openEvent: "<",
		signed: "<",
		onClose: "<",
		onCancel: "<"
	},
	require: {
		wndModel: "?^",
		signingWizard: "?^"
	},
	controller: signatureConfirmationCtrl,
};

signatureConfirmationCtrl.$inject = ["$scope", "$mdDialog", "$window"];
function signatureConfirmationCtrl($scope, $mdDialog, $window) {
	const $ctrl = this;
	$ctrl.$onInit = function () {
		$scope.sigConfCtrl = $ctrl.outerCtrl || $ctrl;
	};

	$ctrl.$onChanges = function (changes) {
		if (changes.openEvent && changes.openEvent.currentValue) {
			$mdDialog.show({
				parent: $window.angular.element(document.body),
				template: template,
				controller: ["$scope", "$mdDialog", "outerCtrl", "signed", function ($scope, $mdDialog, outerCtrl, signed) {
					const $ctrl = this;

					$scope.outerCtrl = outerCtrl;
					$scope.outerCtrl.isModal = true;

					$ctrl.signed = signed;

					$ctrl.cancel = $mdDialog.cancel;

					console.log(signed);

				}],
				bindToController: true,
				controllerAs: "$ctrl",
				focusOnOpen: true,
				fullscreen: true,
				multiple: true,
				locals: {
					outerCtrl: $ctrl,
					signed: $ctrl.signed,
				},
				// onRemoving: function () {
				// 	$ctrl.openEvent.target.focus();
				// },
			}).then(function (result) {
				$ctrl.onClose(result)
			})
			.catch(error => {
				$ctrl.onCancel();
			});

		}
	}
}

angular.module("app").component('signatureConfirmation', signatureConfirmation)
