angular.module('Main').controller('MainController', ['$scope', 
	'Authentication',
	function($scope, Authentication){
		$scope.authentication = Authentication;
	}
]);