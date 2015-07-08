'use strict';

angular.module('repositoryManagement').factory('Content', ['$resource', function($resource) {
	
    return $resource('api/content/:contentId', {
       contentId: '@_id'
    }, {
    	update: {
            method: 'PUT'
        }
    });
}]);
