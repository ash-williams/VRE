'use strict';

angular.module('main').factory('Content', ['$resource', function($resource) {
	
    return $resource('api/repository/:repositoryId', {
       repositoryId: '@_id'
    }, {
    	update: {
            method: 'PUT'
        }
    });
}]);
