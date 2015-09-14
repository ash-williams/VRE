'use strict';

angular
	.module('clinician')
	.controller('ViewContentController', ['$scope', 'Authentication', '$routeParams', 'Categories', 'Content', 'CliniciansPatients', 'TreatmentContent', 'Treatments',
		function($scope, Authentication, $routeParams, Categories, Content, CliniciansPatients, TreatmentContent, Treatments){
			$scope.authentication = Authentication;
			$scope.name = 'content';
			$scope.conId = $routeParams.conId;
			
			$scope.categories = Categories.query();
			$scope.allcontent = Content.query();
			$scope.repos = "/VRE_REPOS";

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
				try{
					var type = con.type;
					var baseType = type.split('/')[0];
					//alert(baseType + "," + type);
					if(baseType === match){
						return true;
					}else{
						return false;
					}
				}catch(e){
					return null;
				}
			}

			$scope.getType = function(con){
				var fullType = con.type;
				var baseType = fullType.split('/')[0];
				//alert(baseType);
				return baseType;
			}

			$scope.getContent = function(id){
				var con = Content.get({repositoryId: id}, function(){
					$scope.thiscontent = con;
				});
			}

			$scope.assignModal = false;
			$scope.assign2Modal = false;
			$scope.tmpTreatmentContent = {};

			$scope.assignContent = function(id){
				$scope.assignConId = id;
				$scope.assignModal = true;
			}

			$scope.clinPatients = function(){
				$scope.patientList = [];
				//var pats = Patients.query(function(){
					var clinspats = CliniciansPatients.query(function(){
						for(var i = 0; i < clinspats.length; i++){
							//alert(JSON.stringify(clinspats[i]));
							 if(clinspats[i].clinician._id === $scope.authentication.user._id){
							 	//alert(JSON.stringify(clinspats[i].patient));
							 	$scope.patientList.push(clinspats[i].patient);
							 }
						}
					});
				//});
			}	

			$scope.patTreatments = function(){
				//alert("1");
				$scope.treatmentList = [];
				var patTreats = Treatments.query(function(){
					//alert("2");
					for(var i = 0; i < patTreats.length; i++){
						//alert("3: " + patTreats[i].completed);
						 if(patTreats[i].patient === $scope.assignPatId && !patTreats[i].completed){
						 	//alert(patTreats[i].patient + "\n" + $scope.assignPatId);
						 	$scope.treatmentList.push(patTreats[i]);
						 }
					}
				});
			}

			$scope.assign = function(id){
				$scope.assignPatId = id;
				$scope.patTreatments();//function(){
					$scope.assignModal = false;
					$scope.assign2Modal = true;
				//});
			}

			$scope.assign2 = function(id){
				$scope.assignTreId = id;
				$scope.assign2Modal = false;
				$scope.assign3Modal = true;
			}

			$scope.assign3 = function(){
				var treatCon = $scope.tmpTreatmentContent;

		    	var tc = new TreatmentContent({
		    		details: treatCon.details,
		    		treatment: $scope.assignTreId,
		    		content: $scope.assignConId,
		    		setBy: $scope.authentication.user._id
		    	});

		    	tc.$save(function(response){
		    		//window.location.reload();
		    		$scope.assign3Modal = false;
		    		$scope.success = "Content Assigned Successfully"
		    	}, function(errorResponse){
		    		$scope.error = errorResponse.data.message;
		    	});
			}

			
			
		}
	]);