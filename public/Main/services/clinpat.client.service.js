'use strict';

angular.module('main').factory('CliniciansPatients', ['$resource', function($resource) {
	
    return $resource('api/clinicianPatient/:clinpatId', {
        clinpatId: '@_id'
    }, {
    	update: {
            method: 'PUT'
        }
    });
}]);