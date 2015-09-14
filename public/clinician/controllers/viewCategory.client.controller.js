'use strict';

angular
	.module('clinician')
	.controller('ViewCategoryController', ['$scope', '$location', '$routeParams', 'Authentication', 'Categories', 'Content',
		function($scope, $location, $routeParams, Authentication, Categories, Content){
			$scope.authentication = Authentication;
			$scope.name = 'view category';
			$scope.catId = $routeParams.catId;
			
			$scope.categories = Categories.query();
			$scope.allcontent = Content.query();
			$scope.repos = "/VRE_REPOS";

			$scope.isSelected = function(name){
				return name === $scope.name;
			}

			$scope.getFullPath = function(con){
				
				var path = (con.path).split("\\");	
				var file = path[path.length -1];
				return $scope.repos + "/" + file;
				
			}

			$scope.isType = function(con, match){
				var type = con.type;
				var baseType = type.split('/')[0];
				//alert(baseType + "," + type);
				if(baseType === match){
					return true;
				}else{
					return false;
				}
			}

			$scope.getType = function(con){
				var fullType = con.type;
				var baseType = fullType.split('/')[0];
				//alert(baseType);
				return baseType;
			}

			$scope.getCategory = function(id){
				var cat = Categories.get({categoryId: id}, function(){
					$scope.category = cat;
				});
			}

			$scope.backButton = function(){
				//alert($scope.category.parentCategory);
				if($scope.category.parentCategory === '558c3049b3ed0904298feefb'){
					$location.path("/Clinician/Repository/");
				}else{
					$location.path("/Clinician/Repository/Category/" + $scope.category.parentCategory);
				}
			}
			
			
		}
	]);