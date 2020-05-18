import angular from "angular";

import testComponent from "./components/test-component";
import dashboardShim from "./components/dashboard-shim";

angular.module("app").component("testComponent", testComponent);
angular.module("app").component("dashboardShim", dashboardShim);