'use strict';

angular.module('main').factory('Patients', ['$resource', function($resource) {
	
    return $resource('api/patient/:patientId', {
        patientId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);