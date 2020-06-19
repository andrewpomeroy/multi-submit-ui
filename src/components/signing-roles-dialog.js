import angular from "angular";
import template from "./signing-roles-dialog.html";

var signingRolesDialog = {
	bindings: {
		openEvent: "<",
		onClose: "<",
		toSign: "<",
		title: "<"
	},
	controller: signingRolesDialogCtrl
};

signingRolesDialogCtrl.$inject = ["$mdDialog", "$filter"]
function signingRolesDialogCtrl($mdDialog, $filter) {
	var $ctrl = this;

	$ctrl.$onChanges = function (changes) {
		if (changes.toSign && changes.toSign.currentValue && changes.toSign.currentValue.forms && changes.toSign.currentValue.forms.length) {
			// Initialize dialog

			$mdDialog
				.show({
					targetEvent: $ctrl.openEvent,
					// openFrom: {
					// },
					// closeTo: {},
					bindToController: true,
					controllerAs: "$ctrl",
					controller: [
						"$scope",
						"$mdDialog",
						"$element",
						"openEvent",
						"toSign",
						"title",
						function signingRolesDialogCtrlInner($scope, $mdDialog, $element, openEvent, toSign, title) {
							var $ctrl = this;

							if (!openEvent) {
								console.warn("No `open-event` specified for signingRolesDialog. This is necessary for accessibility.", $element);
							}
							if (openEvent && !openEvent.target) {
								console.warn("Invalid `open-event` specified for signingRolesDialog. This is necessary for accessibility.", $element);
							}

							$ctrl.toSign = toSign;
							$ctrl.title = title;

							$ctrl.submissionNoun = $ctrl.toSign.formDefinition.name === 'dmr' ? 'DMR' : 'submission';
							$ctrl.submissionNounPlural = $ctrl.toSign.formDefinition.name === 'dmr' ? 'DMRs' : 'submissions';

							$ctrl.roles = $ctrl.toSign.formDefinition.roles;

							$ctrl.model = $ctrl.toSign.forms.map(function (form) {
								return form.certifications.map(function (cert) {
									return {
										value: false,
										certifiedDate: cert.certifiedDate,
										certifierName: cert.certifierName,
										isCertified: Boolean(cert.certifiedDate && cert.certifierName),
										hoverText: (cert.certifiedDate && cert.certifierName
											? "Signed by " + cert.certifierName + " on " + $filter('date')(cert.certifiedDate, 'short')
											: "")
									}
								})
							})

							Object.defineProperties($ctrl, {
								outputModel: {
									get: function () {
										return $ctrl.model.map(function (row, rowIndex) {
											return {
												submissionVersionId: $ctrl.toSign.forms[rowIndex].id,
												roles: row.map(function (col, colIndex) {
													return ({
														value: col.value,
														index: colIndex
													})
												}).filter(function (col, colIndex) {
													return col.value
												}).map(function (col) {
													return $ctrl.roles[col.index]
												})
											}
										}).filter(function (row) {
											return row.roles.length
										})
									}
								},
								readyToSubmit: {
									get: function () {
										return $ctrl.outputModel.length === $ctrl.toSign.forms.length
									}
								}
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


							$ctrl.submit = function () {
							  $mdDialog.hide($ctrl.outputModel);
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
						openEvent: $ctrl.openEvent,
						toSign: $ctrl.toSign,
						title: $ctrl.title
					},
					onRemoving: function () {
						$ctrl.openEvent.target.focus();
					},
				})
				.then(function (results) {
					$ctrl.onClose(results, $ctrl.openEvent);
				});
		}
	}

}

angular.module("app").component('signingRolesDialog', signingRolesDialog);
