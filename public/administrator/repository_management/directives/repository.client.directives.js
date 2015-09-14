'use strict';

angular
	.module('repositoryManagement')
	.directive('addcat', function(){
		return {
			restrict: 'A',
			templateUrl: '/administrator/repository_management/views/add_category.client.view.html'
		}
	})
	.directive('editcat', function(){
		return {
			restrict: 'A',
			templateUrl: '/administrator/repository_management/views/edit_category.client.view.html'
		}
	})
	.directive('addcon', function(){
		return {
			restrict: 'A',
			templateUrl: '/administrator/repository_management/views/add_content.client.view.html'
		}
	})
	.directive('editcont', function(){
		return {
			restrict: 'A',
			templateUrl: '/administrator/repository_management/views/edit_content.client.view.html'
		}
	});




