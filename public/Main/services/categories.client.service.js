'use strict';

angular.module('main').factory('Categories', ['$resource', function($resource) {
	
    return $resource('api/category/:categoryId', {
       categoryId: '@_id'
    }, {
    	update: {
            method: 'PUT'
        }
    });
}]);
