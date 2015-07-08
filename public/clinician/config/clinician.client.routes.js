'use strict';

angular.module('clinician').config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/Clinician',{
		templateUrl: 'clinician/views/patientManagement/default-pat_man.client.view.html',
		controller: 'PatientManagementController'
	})
	.when('/Clinician/Repository',{
		templateUrl: 'clinician/views/repository/default-rep.client.view.html',
		controller: 'ClinicianRepositoryController'
	})
	.when('/Clinician/Profile',{
		templateUrl: 'clinician/views/clinProfile/default-clinProfile.client.view.html',
		controller: 'ClinicianProfileController'
	})
	.when('/Clinician/Patient/:patId',{
		templateUrl: 'clinician/views/patientManagement/patient/view-patient.client.view.html',
		controller: 'PatientViewController'
	});
}]);