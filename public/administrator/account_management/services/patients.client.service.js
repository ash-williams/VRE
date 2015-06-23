'use strict';

angular.module('accountManagement').factory('Patients', ['$resource', function($resource) {
	
    return $resource('api/patient/:patientId', {
        patientId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);