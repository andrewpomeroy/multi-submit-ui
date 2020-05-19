import angular from "angular";
import template from "./dashboard-collapse-card-list.html";

export default {
	bindings: {
		list: "<"
	},
	template: template,
	transclude: true
};
