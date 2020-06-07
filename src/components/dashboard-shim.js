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
			certificationStatement: faker.lorem.paragraphs(2)
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

	$ctrl.certificationAgreements = [
		"I am the owner of the account used to perform the electronic submission and signature.",
		"I have the authority to submit the data on behalf of the facility I am representing.",
		"I agree that providing the account credentials to sign the submission document constitutes an electronic signature equivalent to my written signature.",
		"I have reviewed the electronic form being submitted in its entirety, and agree to the validity and accuracy of the information contained within it to the best of my knowledge.",
	]

}

angular.module("app").component('dashboardShim', component);
