angular.module('administrator').directive('adminnav', function(){
	return{
		restrict : 'E',
		templateUrl : '/administrator/views/nav-administrator.client.view.html'
	};
});

angular.module('administrator').directive('userAccounts', function(){
	return {
      restrict: 'A',
      templateUrl: '/administrator/account_management/views/default-acc_man.client.view.html'
    };
	});

angular.module('administrator').directive('centralRepository', function(){
	return {
	  restrict: 'A',
	  templateUrl: '/administrator/repository_management/views/default-rep_man.client.view.html'
	};
});