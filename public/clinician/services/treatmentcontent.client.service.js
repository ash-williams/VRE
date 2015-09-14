'use strict';

angular.module('clinician').factory('TreatmentContent', ['$resource', function($resource) {
	
    return $resource('api/treatmentcontent/:treatmentcontentId', {
        treatmentcontentId: '@_id'
    }, {
    	update: {
            method: 'PUT'
        }
    });
}]);