'use strict';

angular
	.module('repositoryManagement')
	.controller('RepositoryController', ['$scope', '$routeParams', 'Authentication', 'Categories', 'Content',
		function($scope, $routeParams, Authentication, Categories, Content){
			$scope.authentication = Authentication;
			$scope.addCatModal = false;
			$scope.editCatModal = false;
			$scope.addConModal = false;
			$scope.categories = Categories.query();
			$scope.category = {};	
			$scope.catView = '558c3049b3ed0904298feefb';
			$scope.previousCatStack = new Array();		

		    $scope.toggleAddCatModal = function(){
		        $scope.addCatModal = !$scope.addCatModal;
		    };

		    $scope.addCategory = function(){
			    $scope.toggleAddCatModal();
		    };

		    $scope.toggleAddConModal = function(){
		    	$scope.addConModal = !$scope.addConModal;
		    };

		    $scope.addContent = function(){
		    	$scope.toggleAddConModal();
		    };

		    $scope.toggleEditCatModal = function(){
		        $scope.editCatModal = !$scope.editCatModal;
		    };

		    $scope.editCategory = function(){
		    	$scope.findById($scope.catView);
			    $scope.toggleEditCatModal();
		    };

		    $scope.findById = function(id){
		    	$scope.tempCat = Categories.get({
					categoryId: id
				});
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

				alert(category.parentCategory);
				if(category.parentCategory){
					//alert("here");
					cat.parentCategory = category.parentCategory._id;
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
			}

			$scope.selectView = function(setView){
				$scope.previousCatStack.push($scope.catView);
				$scope.catView = setView;
				//alert($scope.catView);
			}

			$scope.backButton = function(){
				$scope.catView = $scope.previousCatStack.pop();
			}

			$scope.isSelected = function(checkView){
				return $scope.catView === checkView;
			}

			$scope.onFileSelect = function($file){
				alert("one");
				$upload.upload({
					url: '/CentralRepository',
					file: $file,
					progress: function(e){}
				}).then(function(data, status, headers, config){
					console.log(data);
					alert("two");
				});
			}
		
		}
	]);
   

       


