import angular from "angular";
import _ from 'lodash';
import template from "./final-signing-dialog.html";

var finalSigningDialog = {
	bindings: {
		openEvent: "<",
		onClose: "<",
		onCancel: "<",
		toSign: "<",
		title: "<",
		certificationAgreements: "<"
	},
	controller: finalSigningDialogCtrl
};

finalSigningDialogCtrl.$inject = ["$mdDialog", "$filter"]
function finalSigningDialogCtrl($mdDialog, $filter) {
	var $ctrl = this;

	$ctrl.$onChanges = function (changes) {
		if (changes.toSign && changes.toSign.currentValue && changes.toSign.currentValue.length) {
			// Initialize dialog
			$mdDialog
				.show({
					targetEvent: $ctrl.openEvent,
					clickOutsideToClose: true,
					bindToController: true,
					controllerAs: "$ctrl",
					controller: [
						"$scope",
						"$mdDialog",
						"$element",
						"openEvent",
						"toSign",
						"title",
						"certificationAgreements",
						function finalSigningDialogCtrlInner($scope, $mdDialog, $element, openEvent, toSign, title, certificationAgreements) {
							var $ctrl = this;

							if (!openEvent) {
								console.warn("No `open-event` specified for finalSigningDialog. This is necessary for accessibility.", $element);
							}
							if (openEvent && !openEvent.target) {
								console.warn("Invalid `open-event` specified for finalSigningDialog. This is necessary for accessibility.", $element);
							}

							$ctrl.toSign = toSign;
							$ctrl.title = title;
							$ctrl.certificationAgreements = certificationAgreements;

							Object.defineProperties($ctrl, {
								roles: {
									get: function () {
										var allRoles = [];
										$ctrl.toSign.forEach(function (form) {
											form.roles.forEach(function (role) {
												allRoles.push(role);
											})
										})
										return Array.from(new Set(allRoles));
									}
								},
								readyToSubmit: {
									get: function () {
										return ($ctrl.checkboxModel.every(function (checkbox) {
											return checkbox === true
										}) && $ctrl.password.length && $ctrl.securityQuestionAnswer.length)
									}
								}
							})

							$ctrl.checkboxModel = $ctrl.certificationAgreements.map(function () {
								return false
							})

							$ctrl.submit = function () {
							  $mdDialog.hide();
							};
							$ctrl.cancel = function () {
							  $mdDialog.cancel();
							};

						},
					],
					template: template,
					locals: {
						openEvent: $ctrl.openEvent,
						toSign: $ctrl.toSign,
						title: $ctrl.title,
						certificationAgreements: $ctrl.certificationAgreements,
					},
					onRemoving: function () {
						$ctrl.openEvent.target.focus();
					},
				})
				.then(function (results) {
					$ctrl.onClose(results);
				})
				.catch(function (error) {
					if (error) {
						console.error(error);
					}
					$ctrl.onCancel();
				})
				;
		}
	}

}

angular.module("app").component('finalSigningDialog', finalSigningDialog)
