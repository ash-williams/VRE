'use strict';

angular
	.module('clinician')
	.controller('PatientViewController', ['$scope', '$location', '$routeParams', 'Authentication', 'Accounts', 'Patients',
		function($scope, $location, $routeParams, Authentication, Accounts, Patients){
			$scope.authentication = Authentication;
			$scope.name = 'patman';
			$scope.patId = $routeParams.patId;

			$scope.isSelected = function(name){
				return name === $scope.name;
			}

			$scope.getPatient = function(id){
				var acc = Accounts.get({
					accountId: id
				}, function(){
					//$scope.account = acc;
					var pats = Patients.query(function(){
						for(var i = 0; i < pats.length; i++){
							if(pats[i].account._id === acc._id){
								$scope.patient = pats[i];
								//alert(JSON.stringify($scope.patient));
								break;
							}
						}
					});
				});	
			}

		}
	]);