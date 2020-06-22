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

					// MOCK -- please replace
					$ctrl.signed.forEach(function (submission) {
						submission.amountDue = Math.floor(Math.random() * 100);
					})

					$ctrl.cancel = $mdDialog.cancel;

					$ctrl.selectedIds = [];
					
					$ctrl.isSelected = function (item) {
						return Boolean($ctrl.selectedIds.find(function (id) {
							return id === item.id;
						}));	
					}

					function _toggleItem(array, value) {
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

					Object.defineProperties($ctrl, {
						totalAmountSelected: {
							get: function () {
								return $ctrl.selectedIds.reduce(function(amount, id) {
									var submission = $ctrl.signed.find(function (submission) {
										return submission.id === id;
									})
									amount += submission.amountDue;
									return amount;
								}, 0)
							}
						}
					})

					

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
