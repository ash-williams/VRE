'use strict';

angular.module('accountManagement').factory('Administrators', ['$resource', function($resource) {
	
    return $resource('api/administrator/:administratorId', {
        administratorId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);