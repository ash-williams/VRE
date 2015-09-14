'use strict;'

angular.module('administrator').config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/Administrator', {
		templateUrl: 'administrator/account_management/views/default-acc_man.client.view.html'
	})
	.when('/Administrator/repository', {
		templateUrl: 'administrator/repository_management/views/default-rep_man.client.view.html'
	})
	.when('/Administrator/repository/cat/:catId', {
		templateUrl: 'administrator/repository_management/views/default-rep_man.client.view.html'
	})
	.when('/Administrator/repository/:conId', {
		templateUrl: 'administrator/repository_management/views/view-content.client.view.html'
	});
}]);