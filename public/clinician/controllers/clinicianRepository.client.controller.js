'use strict';

angular
	.module('clinician')
	.controller('ClinicianRepositoryController', ['$scope', 'Authentication',
		function($scope, Authentication){
			$scope.authentication = Authentication;
			$scope.name = 'repos';

			$scope.isSelected = function(name){
				return name === $scope.name;
			}
		}
	]);