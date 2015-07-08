'use strict';

angular.module('clinician').factory('Clincians', ['$resource', function($resource) {
	
    return $resource('api/clinician/:clinicianId', {
        clinicianId: '@_id'
    }, {
    	update: {
            method: 'PUT'
        }
    });
}]);