'use strict';

angular
	.module('clinician')
	.controller('ClinicianRepositoryController', ['$scope', 'Authentication', 'Categories', 'Content',
		function($scope, Authentication, Categories, Content){
			$scope.authentication = Authentication;
			$scope.name = 'repos';
			$scope.searchBar = "";
			$scope.categories = Categories.query();
			$scope.allcontent = Content.query();
			$scope.repos = "/VRE_REPOS";

			$scope.isSelected = function(name){
				return name === $scope.name;
			}

			$scope.getFullPath = function(con){
				try{
					var path = (con.path).split("\\");	
					var file = path[path.length -1];
					return $scope.repos + "/" + file;
				}catch(e){
					return null;
				}
				
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

			$scope.getThumbPath = function(con){
				var path = (con.path).split("\\");	
				var file = path[path.length -1];
				var fileName = file.split(".")[0];

				return $scope.repos + "/thumbnails/" + fileName + ".jpeg";
			}

			$scope.thumbExists = function(con){
				if(getThumbPath(con)){
					return true;
				}else{
					return false;
				}
			}

			
			
			
		}
	]);