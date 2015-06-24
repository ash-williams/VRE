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
	}).directive('modal', function () {
	    return {
	      template: '<div class="modal fade">' + 
	          '<div class="modal-dialog">' + 
	            '<div class="modal-content">' + 
	              '<div class="modal-header">' + 
	                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
	                '<h4 class="modal-title">{{ title }}</h4>' + 
	              '</div>' + 
	              '<div class="modal-body" ng-transclude></div>' + 
	            '</div>' + 
	          '</div>' + 
	        '</div>',
	      restrict: 'E',
	      transclude: true,
	      replace:true,
	      scope:true,
	      link: function postLink(scope, element, attrs) {
	        scope.title = attrs.title;

	        scope.$watch(attrs.visible, function(value){
	          if(value == true)
	            $(element).modal('show');
	          else
	            $(element).modal('hide');
	        });

	        $(element).on('shown.bs.modal', function(){
	          scope.$apply(function(){
	            scope.$parent[attrs.visible] = true;
	          });
	        });

	        $(element).on('hidden.bs.modal', function(){
	          scope.$apply(function(){
	            scope.$parent[attrs.visible] = false;
	          });
	        });
	      }
	    };
	  });




