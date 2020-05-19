import angular from "angular";

import "./imported/dashboard-section";

import testComponent from "./components/test-component";
import dashboardShim from "./components/dashboard-shim";
import dashboardSignatureRequests from "./components/dashboard-signature-requests";
import dashboardCollapseCardList from "./components/dashboard-collapse-card-list";
import dashboardCollapseHeader from "./components/dashboard-collapse-header";
import dashboardCollapseListContents from "./components/dashboard-collapse-list-contents";
import dashboardCardList from "./components/dashboard-card-list";
import dashboardCardListItem from "./components/dashboard-card-list-item";

angular.module("app").component("testComponent", testComponent);
angular.module("app").component("dashboardShim", dashboardShim);
angular.module("app").component("dashboardSignatureRequests", dashboardSignatureRequests);
angular.module("app").component("dashboardCollapseCardList", dashboardCollapseCardList);
angular.module("app").component("dashboardCollapseHeader", dashboardCollapseHeader);
angular.module("app").component("dashboardCollapseListContents", dashboardCollapseListContents);
angular.module("app").component("dashboardCardList", dashboardCardList);
angular.module("app").component("dashboardCardListItem", dashboardCardListItem);