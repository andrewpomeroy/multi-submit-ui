import angular from "angular";
import '@uirouter/angularjs';

angular.module("app", ['ui.router']).controller("HelloController", function ($scope) {
	$scope.person = "andrew";
});

angular.module("app").config(['$locationProvider',
	function ($locationProvider) {
		// $locationProvider.hashPrefix('!');
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: true
		});
	}
]);

angular.module("app").config(['$stateProvider',
	function ($stateProvider) {
		$stateProvider.state({
			name: 'root',
			url: '/',
			template: '<h3>Hello from the root state!</h3>'
		})

	}
]);


import testComponent from "./components/test-component";
angular.module("app").component("testComponent", testComponent);