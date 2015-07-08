'use strict';

angular
	.module('clinician')
	.controller('ClinicianProfileController', ['$scope', 'Authentication',
		function($scope, Authentication){
			$scope.authentication = Authentication;
			$scope.name = 'profile';

			$scope.isSelected = function(name){
				return name === $scope.name;
			}
		}
	]);