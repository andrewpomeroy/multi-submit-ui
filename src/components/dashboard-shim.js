import angular from "angular";
import template from "./dashboard-shim.html";
import faker from "faker";
import dayjs from "dayjs";
import uuid from "uuid4";

export default {
	bindings: {
	},
	template: template,
	// transclude: true
	controller: controller
};

function controller () {
	var $ctrl = this;

	function makeFakeDmr() {
		var siteName = faker.company.companyName();
		var	startDate = faker.date.past();
		var endDate = faker.date.recent();
		var requiredSignatures = Math.floor(Math.random() * 5 + 1);
		var signatures = Math.floor(Math.random() * (requiredSignatures - 1));
		signatures = signatures < 0 ? 0 : signatures;
		return {
			id: uuid(),
			siteName,
			startDate,
			endDate,
			displayFields: [
				{
					label: siteName,
					value: dayjs(startDate).format("MM/DD/YYYY") + " — " + dayjs(endDate).format("MM/DD/YYYY"),
				}
			],
			requiredSignatures,
			signatures: [...Array(signatures).keys()].map(function () {
				return {
					name: faker.name.findName(),
					date: faker.date.recent()
				};
			})
		};
	}

	var dmrRange = [...Array(5).keys()];
	var dmrs = dmrRange.map(makeFakeDmr);
	var otherForms = dmrRange.map(makeFakeDmr);

	$ctrl.forms = {
		dmr: dmrs,
		other: otherForms
	};

}