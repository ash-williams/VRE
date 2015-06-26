'use strict';

angular
	.module('repositoryManagement')
	.controller('RepositoryController', ['$scope', '$routeParams', 'Authentication', 'Categories',
		function($scope, $routeParams, Authentication, Categories){
			$scope.authentication = Authentication;
			$scope.addCatModal = false;
			$scope.categories = Categories.query();
			$scope.category = {};			

		    $scope.toggleAddCatModal = function(){
		        $scope.addCatModal = !$scope.addCatModal;
		    };

		    $scope.addCategory = function(){
			    $scope.toggleAddCatModal();
		    };

		    $scope.getCategories = function(){
				$scope.categories = Categories.query();
			};

		    $scope.createCategory = function(){
				var category = $scope.category;
				//alert("hello");

				var cat =  new Categories({
					name: category.name,
					creator: $scope.authentication.user._id
				});

				if(category.parent){
					cat.parentCategory = category.parent._id;
				}else{
					cat.parentCategory = '558c3049b3ed0904298feefb';
				}

				//alert(JSON.stringify(cat));

				cat.$save(function(response) {
		    		alert("Category Added");
			    }, function(errorResponse) {
			        $scope.error = errorResponse.data.message;
			    });
				//window.location.reload();		
			}; 
		
		}
	]);
   

       


