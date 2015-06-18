angular.module('Main').config(['$routeProvider',
	function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl: 'Main/views/main.client.view.html'
	})
	.otherwise({
		redirectTo: '/'
	});
	}
]);