'use strict';

angular.module('clinician').factory('Information', ['$resource', function($resource) {
	
    return $resource('api/information/:informationId', {
        informationId: '@_id'
    }, {
    	update: {
            method: 'PUT'
        }
    });
}]);