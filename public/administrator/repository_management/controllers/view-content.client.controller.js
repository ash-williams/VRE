'use strict';

angular
	.module('repositoryManagement')
	.controller('ContentViewController', ['$scope', '$location', '$routeParams', 'Authentication', 'Content', 'Categories',
		function($scope, $location, $routeParams, Authentication, Content, Categories){
			$scope.authentication = Authentication;
			$scope.contentId = $routeParams.conId;
			$scope.thiscontent = {};
			$scope.category = {};
			$scope.categories = Categories.query();
			$scope.repos = "/VRE_REPOS";

			$scope.editContModal = false;


			$scope.initContent = function(id){
				//alert($scope.contentId);
				var con = Content.get({
					repositoryId: id
				}, function(){
					//$scope.account = acc;
					$scope.thiscontent = con;
					$scope.getCategory();
					$scope.getContentPath();
				});	
			}

			$scope.getContentPath = function(){
				
				var path = ($scope.thiscontent.path).split("\\");
				$scope.file = path[path.length -1];
				$scope.fullPath = $scope.repos + "/" + $scope.file;
				$scope.fileType = ($scope.thiscontent.type).split("/")[0];
				//alert($scope.fullPath);
			}

			$scope.getCategory = function(){
				var id = $scope.thiscontent.category
				//alert("hello");
				var cat = Categories.get({
					categoryId: id
				}, function(){
					$scope.thiscontent.category = cat;
					//alert(JSON.stringify($scope.thiscontent));
				});
			}

			$scope.editContent = function(){
				$scope.toggleEditContModal();
			}

			$scope.toggleEditContModal = function(){
		        $scope.editContModal = !$scope.editContModal;
		    }

		    $scope.postEditContent = function(){
		    	// alert(
		    	// 	"name: " + $scope.thiscontent.name +
		    	// 	"\ncategory: " + $scope.thiscontent.category +
		    	// 	"\npat desc: " + $scope.thiscontent.patient_description + 
		    	// 	"\nclin desc: " + $scope.thiscontent.clinician_description
		    	// 	);


		    	var con = new Content({
					name: $scope.thiscontent.name,
					category: $scope.thiscontent.category._id,
					clinician_description: $scope.thiscontent.clinician_description,
					patient_description: $scope.thiscontent.patient_description
				});

				Content.update({repositoryId:$scope.contentId}, con, function(){
					//alert("update ok");
					$scope.success = "Content updated";
					$scope.toggleEditContModal();
				}, function(errorResponse){
					$scope.error = errorResponse.data.message;
				});
		    }

			$scope.deleteContent = function(){
				Content.delete({repositoryId: $scope.contentId}, function(){
					$scope.success = "Content Deleted";
					$scope.backToCategory();
				});

			}

			$scope.backToCategory = function(){
				$location.path('/Administrator/repository/');
			}
			


		}
	]);