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
	})
	.directive('viewtreatment', function(){
		return {
			restrict: 'A',
			templateUrl: '/clinician/views/patientManagement/patient/treatments/view-treatment.client.view.html'
		}
	})
	.directive('edittreatment', function(){
		return {
			restrict: 'A',
			templateUrl: '/clinician/views/patientManagement/patient/treatments/edit-treatment.client.view.html'
		}
	})
	.directive('viewprevioustreatment', function(){
		return {
			restrict: 'A',
			templateUrl: '/clinician/views/patientManagement/patient/treatments/view-previous-treatment.client.view.html'
		}
	})
	.directive('completetreatment', function(){
		return {
			restrict: 'A',
			templateUrl: '/clinician/views/patientManagement/patient/treatments/complete-treatment.client.view.html'
		}
	})
	.directive('addinformation', function(){
		return {
			restrict: 'A',
			templateUrl: '/clinician/views/patientManagement/patient/information/add-information.client.view.html'
		}
	})
	.directive('viewinformation', function(){
		return {
			restrict: 'A',
			templateUrl: '/clinician/views/patientManagement/patient/information/view-information.client.view.html'
		}
	})
	.directive('editinformation', function(){
		return {
			restrict: 'A',
			templateUrl: '/clinician/views/patientManagement/patient/information/edit-information.client.view.html'
		}
	})
	.directive('assigncontent', function(){
		return {
			restrict: 'A',
			templateUrl: '/clinician/views/repository/assign-content.client.view.html'
		}
	})
	.directive('assigncontenttwo', function(){
		return {
			restrict: 'A',
			templateUrl: '/clinician/views/repository/assign-content2.client.view.html'
		}
	})
	.directive('assigncontentthree', function(){
		return {
			restrict: 'A',
			templateUrl: '/clinician/views/repository/assign-content3.client.view.html'
		}
	});

