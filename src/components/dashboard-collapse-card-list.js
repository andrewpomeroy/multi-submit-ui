import angular from "angular";
import template from "./dashboard-collapse-card-list.html";

export default {
	bindings: {
		list: "<",
		isExpanded: "<"
	},
	template: template,
	transclude: true
};
