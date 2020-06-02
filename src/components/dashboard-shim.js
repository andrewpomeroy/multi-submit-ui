import angular from "angular";
import template from "./dashboard-shim.html";
import faker from "faker";
import dayjs from "dayjs";
import uuid from "uuid4";

var component = {
	bindings: {
	},
	template: template,
	// transclude: true
	controller: controller
};

function controller () {
	var $ctrl = this;

	function makeSignatures() {
		var requiredSignatures = Math.floor(Math.random() * 5 + 1);
		var signatures = Math.floor(Math.random() * (requiredSignatures - 1));
		signatures = signatures < 0 ? 0 : signatures;
		return {
			requiredSignatures,
			signatures: [...Array(signatures).keys()].map(function () {
				return {
					name: faker.name.findName(),
					date: faker.date.recent()
				};
			})
		}
	}
	function makeFakeGenericForm() {
		return {
			...makeSignatures(),
			id: uuid(),
		}
	}
	function makeFakeForm() {
		var submissionId = uuid();
		var preparedDate = faker.date.recent();
		var preparedBy = faker.name.findName();
		return {
			...makeFakeGenericForm(),
			submissionId,
			preparedDate,
			preparedBy,
			// displayFields: [
			// 	{
			// 		label: "Submission ID",
			// 		value: submissionId
			// 	},
			// 	{
			// 		label: "Prepared On",
			// 		value: dayjs(preparedDate).format("MM/DD/YYYY")
			// 	},
			// 	{
			// 		label: "Prepared By",
			// 		value: preparedBy
			// 	},
			// ]
			displayData: {
				submissionId,
				preparedOnDisplay: dayjs(preparedDate).format("MM/DD/YYYY"),
				preparedBy,
				siteName: faker.company.companyName(),
				invitationNotes: faker.lorem.paragraph(),
			}
		}
	}

	function makeFakeDmr() {
		var	startDate = faker.date.past();
		var endDate = faker.date.recent();
		return {
			...makeFakeGenericForm(),
			startDate,
			endDate,
			displayData: {
				siteName: faker.company.companyName(),
				dateRangeStr: dayjs(startDate).format("MM/DD/YYYY") + " — " + dayjs(endDate).format("MM/DD/YYYY"),
			}
			// displayFields: [
			// 	{
			// 		label: siteName,
			// 		value: dayjs(startDate).format("MM/DD/YYYY") + " — " + dayjs(endDate).format("MM/DD/YYYY"),
			// 	}
			// ],
		};
	}

	var range = () => [...Array(Math.floor(Math.random() * 3 + 2)).keys()];
	var dmrs = range().map(makeFakeDmr);
	var otherForms = range().map(makeFakeForm);

	$ctrl.forms = [
		{
			name: "other",
			displayName: "Some Other Form",
			items: otherForms
		},
		{
			name: "dmr",
			displayName: "DMRs",
			items: dmrs
		},
	];

}

angular.module("app").component('dashboardShim', component);