angular.module('main').controller('MainController', ['$scope', '$location', 
	'Authentication',
	function($scope, $location, Authentication){
		$scope.authentication = Authentication;

		if($scope.authentication.user != null){
			if($scope.authentication.user.accountType === 'Clinician'){
				$location.path('/Clinician');
			}

			if($scope.authentication.user.accountType === 'Administrator'){
				$location.path('/Administrator');
			}
	
		}
		
	}
]);