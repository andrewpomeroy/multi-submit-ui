import angular from "angular";
import template from "./test-component.html";

var component = {
	bindings: {
		prop: "<",
	},
	template: template
};

angular.module("app").component('testComponent', component)