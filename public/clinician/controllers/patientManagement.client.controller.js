'use strict';

angular
	.module('clinician')
	.controller('PatientManagementController', ['$scope', '$location', 'Authentication', 'CliniciansPatients', 'Clinicians', 'Accounts', 'Patients',
		function($scope, $location, Authentication, CliniciansPatients, Clinicians, Accounts, Patients){
			$scope.authentication = Authentication;
			$scope.name = 'patman';
			$scope.success = "";
			$scope.assignModal = false;
			
			$scope.clinpatients = function(){
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

			$scope.isSelected = function(name){
				return name === $scope.name;
			}

			$scope.getPatients = function(){
				$scope.patients = Patients.query();
			};

			$scope.getClinPatients = function(){
				$scope.clinicianspatients = CliniciansPatients.query();
			};


			$scope.toggleAssignModal = function(){
		        $scope.assignModal = !$scope.assignModal;
		    }

			$scope.viewAssign = function(){
				$scope.toggleAssignModal();
		    }

		    $scope.assignPatient = function(patId){
		    	//alert("patient: " + patId + "\n clinician's account : " + $scope.authentication.user._id);
		    	
		    	var clinpat = new CliniciansPatients({
				        	patient: patId,
				        	clinician: $scope.authentication.user._id
				        });

		        clinpat.$save(function(response){
		        	//alert("Added successfully");
		        	$scope.toggleAssignModal()
		        	$scope.success = "Patient has been assigned to you";
		        	//$location.path('/Clinician/patient/patId');
		        	
		        }, function(errorResponse){
		        	$scope.error = errorResponse.data.message;
		        });
		    }

		    $scope.viewPatient = function(patId){
		    	
		    	$location.path('/Clinician/Patient/' + patId);
		    }
				
			

		}
		
	]);