'use strict';

angular.module('clinician')
	.directive('clinnav', function(){
		return{
			restrict : 'E',
			templateUrl : '/clinician/views/nav-clinician.client.view.html'
		}
	})
	.directive('asspat', function(){
		return {
			restrict: 'A',
			templateUrl: '/clinician/views/patientManagement/assign_patient.client.view.html'
		}
	});

