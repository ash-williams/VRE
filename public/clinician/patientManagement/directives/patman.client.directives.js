angular.module('patientManagement').directive('goals', function(){
	return {
      restrict: 'A',
      templateUrl: '/clinician/patientManagement/goals/views/default-goals.client.view.html'
    };
	});

angular.module('patientManagement').directive('treatments', function(){
	return {
      restrict: 'A',
      templateUrl: '/clinician/patientManagement/treatments/views/default-treatments.client.view.html'
    };
	});

angular.module('patientManagement').directive('information', function(){
	return {
      restrict: 'A',
      templateUrl: '/clinician/patientManagement/information/views/default-information.client.view.html'
    };
	});