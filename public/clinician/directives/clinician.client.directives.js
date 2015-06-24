angular.module('clinician').directive('clinnav', function(){
	return{
		restrict : 'E',
		templateUrl : '/clinician/views/nav-clinician.client.view.html'
	};
});

angular.module('clinician').directive('patientmanage', function(){
	return {
      restrict: 'A',
      templateUrl: '/clinician/patientManagement/views/default-pat_man.client.view.html'
    };
	});

angular.module('clinician').directive('repository', function(){
	return {
	  restrict: 'A',
	  templateUrl: '/clinician/repository/views/default-rep.client.view.html'
	};
});