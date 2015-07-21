'use strict';

angular.module('clinician').factory('Goals', ['$resource', function($resource) {
	
    return $resource('api/goal/:goalId', {
        goalId: '@_id'
    }, {
    	update: {
            method: 'PUT'
        }
    });
}]);