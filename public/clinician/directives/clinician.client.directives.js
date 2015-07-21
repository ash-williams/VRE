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
	})
	.directive('goals', function(){
		return {
			restrict: 'A',
			templateUrl: '/clinician/views/patientManagement/patient/goals/default-goals.client.view.html'
		}
	})
	.directive('treatments', function(){
		return {
			restrict: 'A',
			templateUrl: '/clinician/views/patientManagement/patient/treatments/default-treatments.client.view.html'
		}
	})
	.directive('information', function(){
		return {
			restrict: 'A',
			templateUrl: '/clinician/views/patientManagement/patient/information/default-information.client.view.html'
		}
	})
	.directive('addgoal', function(){
		return {
			restrict: 'A',
			templateUrl: '/clinician/views/patientManagement/patient/goals/add-goal.client.view.html'
		}
	})
	.directive('completegoal', function(){
		return {
			restrict: 'A',
			templateUrl: '/clinician/views/patientManagement/patient/goals/set-complete.client.view.html'
		}
	})
	.directive('viewcompletegoal', function(){
		return {
			restrict: 'A',
			templateUrl: '/clinician/views/patientManagement/patient/goals/view-complete.client.view.html'
		}
	})
	.directive('editgoal', function(){
		return {
			restrict: 'A',
			templateUrl: '/clinician/views/patientManagement/patient/goals/edit-goal.client.view.html'
		}
	})
	.directive('addtreatment', function(){
		return {
			restrict: 'A',
			templateUrl: '/clinician/views/patientManagement/patient/treatments/add-treatment.client.view.html'
		}
	});

