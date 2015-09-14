'use strict';

angular.module('clinician').factory('Treatments', ['$resource', function($resource) {
	
    return $resource('api/treatment/:treatmentId', {
        treatmentId: '@_id'
    }, {
    	update: {
            method: 'PUT'
        }
    });
}]);