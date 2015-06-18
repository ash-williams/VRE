angular.module('administrators').config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/administrators', {
		templateUrl: 'administrators/views/list-administrators.client.view.html'
	})
	.when('/administrators/create', {
		templateUrl: 'administrators/views/create-administrator.client.view.html'
	})
	.when('/administrators/:administratorId', {
		templateUrl: 'administrators/views/view-administrator.client.view.html'
	})
	.when('/administrators/:administratorId/edit', {
		templateUrl: 'administrators/views/edit-administrator.client.view.html'
	});
}]);