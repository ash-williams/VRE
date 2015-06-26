'use strict';

angular.module('repositoryManagement').factory('Categories', ['$resource', function($resource) {
	
    return $resource('api/category/:categoryId', {
       categoryId: '@_id'
    }, {
    	update: {
            method: 'PUT'
        }
    });
}]);
