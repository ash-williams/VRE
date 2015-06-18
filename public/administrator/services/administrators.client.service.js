angular.module('administrators').factory('Administrators', ['$resource', function($resource){
	return $resource('api/administrators/:administratorId', {
		administratorId: '@_id'
	}, {
		update: {
			method: 'PUT'
		}	
	});
}]);