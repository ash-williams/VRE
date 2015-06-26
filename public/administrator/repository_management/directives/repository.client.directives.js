'use strict';

angular
	.module('repositoryManagement')
	.directive('addcat', function(){
		return {
			restrict: 'A',
			templateUrl: '/administrator/repository_management/views/add_category.client.view.html'
		}
	});




