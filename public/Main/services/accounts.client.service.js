'use strict';

angular.module('main').factory('Accounts', ['$resource', function($resource) {
	
    return $resource('api/accounts/:accountId', {
        accountId: '@_id'
    }, {
    	update: {
            method: 'PUT'
        }
    });
}]);