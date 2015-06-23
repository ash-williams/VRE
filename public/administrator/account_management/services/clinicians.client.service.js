'use strict';

angular.module('accountManagement').factory('Clinicians', ['$resource', function($resource) {
	
    return $resource('api/clinician/:clinicianId', {
        clinicianId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);