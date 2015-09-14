'use strict';

angular
	.module('repositoryManagement')
	.controller('RepositoryController', ['$scope', '$routeParams', '$location', 'Authentication', 'Categories', 'Content', 'Upload', '$timeout',
		function($scope, $routeParams, $location, Authentication, Categories, Content, Upload, $timeout){
			$scope.authentication = Authentication;
			$scope.addCatModal = false;
			$scope.editCatModal = false;
			$scope.addConModal = false;
			$scope.categories = Categories.query();
			$scope.allContent = Content.query();
			$scope.category = {};	
			var $file = {};
			$scope.catId = $routeParams.catId;
			

			$scope.previousCatStack = new Array();	

			$scope.initCatView = function(){
				if($scope.catId){
					$scope.catView = $scope.catId;
				}

				if(!$scope.catView){
					$scope.catView = '558c3049b3ed0904298feefb';
				}
			}	

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

			$scope.postEditCategory = function(){
				//alert($scope.tempCat.parentCategory._id + "\n" + $scope.tempCat.parentCategory.name);
				var cat = {
					name: $scope.tempCat.name,
					parentCategory: $scope.tempCat.parentCategory._id
				};
				try{
					Categories.update({categoryId:$scope.tempCat._id}, cat);
					alert("Category Updated");
				}catch(e){
					alert("Error: Category not updated");
				}
			}

			$scope.$watch('file', function () {
		        $scope.upload([$scope.file]);
		    });

		    $scope.log = '';

		    $scope.upload = function(files) {
		    	//alert("Name: " + $scope.content.name + "\nPat Desc: " + $scope.content.patient_description + "\nClin desc: " + $scope.content.clinician_description);
		        //alert($scope.catView);
		        if (files && files.length && $scope.content) {
		            for (var i = 0; i < files.length; i++) {
		                var file = files[i];
		                Upload.upload({
		                    url: '/api/repository',
		                    data: {
		                        'name': $scope.content.name,
		                        'pat_desc': $scope.content.patient_description,
		                        'clin_desc': $scope.content.clinician_description,
		                        'category': $scope.catView
		                    },
		                    file: file
		                }).progress(function (evt) {
		                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
		                    $scope.log = 'progress: ' + progressPercentage + '% ' +
		                                evt.config.file.name + '\n' + $scope.log;
		                }).success(function (data, status, headers, config) {
		                    $timeout(function() {
		                        $scope.log = 'file: ' + config.file.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;
		                    });
		                    $scope.success = "Upload successful";
		                });
		            }
		        }
		    }

		    $scope.viewContent = function(id){
		    	$location.path("/Administrator/repository/" + id);
		    }

		    $scope.deleteCategory = function(catId){
		    	
		    	//if no content and no categories then delete
		    	var flag = true;
		    	//categories
		    	try{
			    	for(var i = 0; i < $scope.categories.length; i++)
			    	{
			    		//alert($scope.categories[i]);
			    		if($scope.categories[i].parentCategory._id == catId){
			    			flag = false;
			    			break;
			    		}
			    	}
			  
			    	for(var j = 0; j < $scope.allContent.length; j++){
			   
			    		if($scope.allContent[j].category === catId){
			    			flag = false;
			    		}
			    	}
		    	}catch(e){}

		    	if(flag){
		    		Categories.delete({categoryId: catId}, function(){
						$scope.success = "Category Deleted";
						$location.path('/Administrator/repository/');
					});
		    	}else{
		    		$scope.error = "Clear out category before deleting"
		    	}
		    }
		
		}
	]);

   

       


