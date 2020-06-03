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

	var range = () => [...Array(Math.floor(Math.random() * 3 + 2)).keys()];

	function makeRole() {

		return {
			roleName: faker.name.jobTitle(),
			id: uuid(),
		}
	}

	var makeRoles = () => range().map(makeRole);

	function makeSignature () {
		return {
			certifierName: faker.name.findName(),
			certifiedDate: faker.date.recent()
		}
	}

	function makeCertifications(roles) {
		const certifications = roles.reduce((output, certification, index) => {
			if (Math.round(Math.random() - .4)) {
				certification = {
					...certification,
					...makeSignature()
				}
			}
			return [...output, certification]
		}, [])
		return certifications
	}

	function makeFakeGenericForm({roles}) {
		return {
			certifications: makeCertifications(roles),
			id: uuid(),
		}
	}
	function makeFakeForm({roles}) {
		var submissionId = uuid();
		var preparedDate = faker.date.recent();
		var preparedBy = faker.name.findName();
		var form = {
			...makeFakeGenericForm({ roles }),
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
				preparedOnDisplay: dayjs(preparedDate).format("MM/DD/YYYY"),
				preparedBy,
				siteName: faker.company.companyName(),
				invitationNotes: faker.lorem.paragraph(),
			}
		}
		form.displayData.submissionId = form.id;
		return form;
	}

	function makeFakeDmr({roles}) {
		var	startDate = faker.date.past();
		var endDate = faker.date.recent();
		return {
			...makeFakeGenericForm({roles}),
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

	function makeForms ({ formFactory, ...params }) {
		const roles = makeRoles();
		const forms = range().map(() => formFactory({roles}))
		return {
			name: params.name,
			displayName: params.displayName,
			roles: roles,
			items: forms,
		}
	}

	$ctrl.forms = [
		makeForms({
			name: "other",
			displayName: "Some Other Form",
			formFactory: makeFakeForm
		}),
		makeForms({
			name: "dmr",
			displayName: "DMRs",
			formFactory: makeFakeDmr
		})
	]

}

angular.module("app").component('dashboardShim', component);