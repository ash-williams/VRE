angular
	.module('accountManagement')
	.directive('patientaccs', function(){
		return {
	      restrict: 'A',
	      templateUrl: '/administrator/account_management/views/list-patients.client.view.html'
	    };
	})
	.directive('clinicianaccs', function(){
		return {
	      restrict: 'A',
	      templateUrl: '/administrator/account_management/views/list-clinicians.client.view.html'
	    };
	})
	.directive('adminaccs', function(){
		return {
	      restrict: 'A',
	      templateUrl: '/administrator/account_management/views/list-administrators.client.view.html'
	    };
	})
	.directive('createacc', function(){
		return {
			restrict: 'A',
			templateUrl: '/administrator/account_management/views/create_acc.client.view.html'
		}
	})
	.directive('viewacc', function(){
		return {
			restrict: 'A',
			templateUrl: '/administrator/account_management/views/view_account.client.view.html'
		}
	})
	.directive('editacc', function(){
		return {
			restrict: 'A',
			templateUrl: '/administrator/account_management/views/edit_account.client.view.html'
		}
	})
	.directive('viewpats', function(){
		return {
			restrict: 'A',
			templateUrl: '/administrator/account_management/views/view_clins_patients.client.view.html'
		}
	});





