'use strict';

angular.module('accountManagement').factory('Accounts', ['$resource', function($resource) {
	
    return $resource('api/accounts/:accountId', {
        accountId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);