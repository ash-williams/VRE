'use strict';

angular
	.module('clinician')
	.controller('PatientViewController', ['$scope', '$location', '$routeParams', 'Authentication', 'Accounts', 'Patients', 'Goals', 'Treatments', 'Information', 'TreatmentContent',
		function($scope, $location, $routeParams, Authentication, Accounts, Patients, Goals, Treatments, Information, TreatmentContent){
			$scope.authentication = Authentication;
			$scope.name = 'patman';
			$scope.patId = $routeParams.patId;
			$scope.tab = 1;
			$scope.success = "";
			

			$scope.addGoalModal = false;
			$scope.setCompleteModal = false;
			$scope.viewCompleteModal = false;
			$scope.editGoalModal = false;

			$scope.addTreatmentModal = false;
			$scope.viewPreviousTreatmentsModal = false;
			$scope.viewTreatmentModal = false;
			$scope.editTreatmentModal = false;
			$scope.setTreCompleteModal = false;

			$scope.addInformationModal = false;
			$scope.viewInformationModal = false;
			$scope.editInformationModal = false;

			$scope.tmpGoal = {};
			$scope.tmpTreatment = {};
			$scope.tmpInformation = {};

			$scope.isSelected = function(name){
				return name === $scope.name;
			}

			$scope.getPatient = function(id){
				var acc = Accounts.get({
					accountId: id
				}, function(){
					//$scope.account = acc;
					var pats = Patients.query(function(){
						for(var i = 0; i < pats.length; i++){
							if(pats[i].account._id === acc._id){
								$scope.patient = pats[i];
								$scope.getCreator($scope.patient.creator);
								//alert(JSON.stringify($scope.patient));
								break;
							}
						}
					});
				});	
			}

			$scope.getCreator = function(creID){
				//alert(creID);
				var acc = Accounts.get({
					accountId: creID
				}, function(){
					$scope.creator = acc;
				});
			}

			$scope.selectTab = function(setTab){
				$scope.tab = setTab;
			};

			$scope.isTabSelected = function(checkTab){
				return $scope.tab === checkTab;
			};

			$scope.toggleAddGoalModal = function(){
		        $scope.addGoalModal = !$scope.addGoalModal;
		    };

		    $scope.toggleAddTreatmentModal = function(){
		        $scope.addTreatmentModal = !$scope.addTreatmentModal;
		    };

		    $scope.toggleAddInformationModal = function(){
		        $scope.addInformationModal = !$scope.addInformationModal;
		    };

		    $scope.addGoal = function(){    	
				$scope.toggleAddGoalModal();
		    };

		    $scope.addTreatment = function(){    	
				$scope.toggleAddTreatmentModal();
		    };

		    $scope.addInformation = function(){    	
				$scope.toggleAddInformationModal();
		    };

		    $scope.createGoal = function(){
		    	var goal = $scope.tmpGoal;

		    	var gol = new Goals({
		    		description: goal.description,
		    		term: goal.term,
		    		patient: $scope.patId
		    	});

		    	gol.$save(function(response){
		    		//window.location.reload();
		    		$scope.toggleAddGoalModal();
		    		$scope.success = " Goal Added Successfully"
		    	}, function(errorResponse){
		    		$scope.error = errorResponse.data.message;
		    	});
		    	// alert(goal);
		    	// alert(JSON.stringify(goal));
		    }

		    $scope.patGoals = function(){
				$scope.goalList = [];
				
				var goals = Goals.query(function(){
					for(var i = 0; i < goals.length; i++){
						//alert(JSON.stringify(goals[i]));
						if(goals[i].patient === $scope.patId){
							if(!goals[i].completed){
						 		//alert(JSON.stringify(clinspats[i].patient));
						 		$scope.goalList.push(goals[i]);
						 	}
						}
					}
				});
				
			}

			$scope.setAsCompleteModal = function(id){
				$scope.tmpGoalId = id;
				$scope.toggleSetCompleteModal();
			}

			$scope.toggleSetCompleteModal = function(){
				$scope.setCompleteModal = !$scope.setCompleteModal;
			}	

			$scope.completeGoal = function(){
				//alert($scope.tmpGoalId);
				$scope.goal = Goals.get({
					goalId: $scope.tmpGoalId
				}, function(){
					var gol = new Goals({
						completed: true
					});
					Goals.update({goalId:$scope.tmpGoalId}, gol, function(){
						//alert("update ok");
						$scope.success = "Goal set as complete";
						$scope.toggleSetCompleteModal();
					}, function(errorResponse){
						$scope.error = errorResponse.data.message;
					});
				});
			}

			$scope.viewCompletedGoals = function(){
				$scope.toggleViewCompleteModal();
			}

			$scope.toggleViewCompleteModal = function(){
				$scope.viewCompleteModal = !$scope.viewCompleteModal;
			}

			$scope.getOldGoals = function(){
				$scope.completedGoals = [];
				
				var goals = Goals.query(function(){
					for(var i = 0; i < goals.length; i++){
						//alert(JSON.stringify(goals[i]));
						if(goals[i].patient === $scope.patId){
							if(goals[i].completed){
						 		//alert(JSON.stringify(clinspats[i].patient));
						 		$scope.completedGoals.push(goals[i]);
						 	}
						}
					}
				});
				
			}

			$scope.editGoal = function(id){
				$scope.tmpGoalId = id;
				$scope.goal = Goals.get({
					goalId: $scope.tmpGoalId
				}, function(){
					$scope.toggleEditGoalModal();
				});	
			}

			$scope.toggleEditGoalModal = function(){
				$scope.editGoalModal = !$scope.editGoalModal;
			}

			$scope.updateGoal = function(){
				var gol = new Goals({
					description: $scope.goal.description,
					term: $scope.goal.term
				});
				Goals.update({goalId:$scope.tmpGoalId}, gol, function(){
					//alert("update ok");
					$scope.success = "Goal updated";
					$scope.toggleEditGoalModal();
				}, function(errorResponse){
					$scope.error = errorResponse.data.message;
				});
			}

			$scope.deleteGoal = function(id){
				Goals.delete({goalId: id}, function(){
					$scope.success = "Goal Deleted";
					window.location.reload();
				})

			}

			$scope.createTreatment = function(){
				var treat = $scope.tmpTreatment;

		    	var tre = new Treatments({
		    		name: treat.name,
		    		details: treat.details,
		    		patient: $scope.patId,
		    		setBy: $scope.authentication._id
		    	});

		    	tre.$save(function(response){
		    		//window.location.reload();
		    		$scope.toggleAddTreatmentModal();
		    		$scope.success = "Treatment Added Successfully"
		    	}, function(errorResponse){
		    		$scope.error = errorResponse.data.message;
		    	});
			}

			$scope.patTreatments = function(){
				$scope.treatmentList = [];
				
				var treatments = Treatments.query(function(){
					for(var i = 0; i < treatments.length; i++){
						//alert(JSON.stringify(goals[i]));
						if(treatments[i].patient === $scope.patId){
							if(!treatments[i].completed){
						 		//alert(JSON.stringify(clinspats[i].patient));
						 		$scope.treatmentList.push(treatments[i]);
						 	}
						}
					}
				});
				
			}

			$scope.togglesetTreAsCompleteModal = function(){
		        $scope.setTreCompleteModal = !$scope.setTreCompleteModal;
		    }

		    $scope.setTreAsComplete = function(id){    
		    	$scope.tmpTreatId = id;	
				$scope.togglesetTreAsCompleteModal();
		    }

		    $scope.toggleeditTreatmentModal = function(){
		        $scope.editTreatmentModal = !$scope.editTreatmentModal;
		    }

		    $scope.editTreatment = function(id){ 
		   		$scope.tmpTreatId = id;
				$scope.treatment = Treatments.get({
					treatmentId: $scope.tmpTreatId
				}, function(){
					$scope.toggleeditTreatmentModal();
				});	   	
		    }


		    $scope.toggleviewTreatmentModal = function(){
		        $scope.viewTreatmentModal = !$scope.viewTreatmentModal;
		    }

		    $scope.viewTreatment = function(id){ 
		    	$scope.tmpTreatId = id; 
		    	$scope.treatment = Treatments.get({
					treatmentId: $scope.tmpTreatId
				}, function(){
					$scope.getContentList();//function(){
						//alert("hit");
						$scope.toggleviewTreatmentModal();
					//});
				});	   	  	
		    }

		    $scope.getContentList = function(){
		    	$scope.contentList = [];

		    	var tcs = TreatmentContent.query(function(){
		    		for(var i = 0; i < tcs.length; i++){
		    			//alert(tcs[i].treatment + "\n" + $scope.treatment._id);
		    			if(tcs[i].treatment === $scope.treatment._id){
		    				$scope.contentList.push(tcs[i]);
		    			}
		    		}
		    	});
		    }

		    $scope.toggleviewPreviousTreatmentsModal = function(){
		        $scope.viewPreviousTreatmentsModal = !$scope.viewPreviousTreatmentsModal;
		    }

		    $scope.viewPreviousTreatments = function(id){    	
				$scope.toggleviewPreviousTreatmentsModal();
		    }

		    $scope.completeTreatment = function(){
				//alert($scope.tmpGoalId);
				$scope.treatment = Treatments.get({
					treatmentId: $scope.tmpTreatId
				}, function(){
					var tre = new Treatments({
						completed: true
					});
					Treatments.update({treatmentId:$scope.tmpTreatId}, tre, function(){
						//alert("update ok");
						$scope.success = "Treatment set as complete";
						$scope.togglesetTreAsCompleteModal();
					}, function(errorResponse){
						$scope.error = errorResponse.data.message;
					});
				});
			}

			$scope.getOldTreatments = function(){
				$scope.completedTreatments = [];
				
				var treatments = Treatments.query(function(){
					for(var i = 0; i < treatments.length; i++){
						//alert(JSON.stringify(goals[i]));
						if(treatments[i].patient === $scope.patId){
							if(treatments[i].completed){
						 		//alert(JSON.stringify(clinspats[i].patient));
						 		$scope.completedTreatments.push(treatments[i]);
						 	}
						}
					}
				});
				
			}

			$scope.updateTreatment = function(){
				var tre = new Treatments({
					name: $scope.treatment.name,
					details: $scope.treatment.details
				});
				Treatments.update({treatmentId:$scope.tmpTreatId}, tre, function(){
					//alert("update ok");
					$scope.success = "Treatment updated";
					$scope.toggleeditTreatmentModal();
				}, function(errorResponse){
					$scope.error = errorResponse.data.message;
				});
			}

			$scope.deleteTreatment = function(id){
				Treatments.delete({treatmentId: id}, function(){
					$scope.success = "Treatment Deleted";
					window.location.reload();
				})

			}

			//Information

			$scope.createInformation = function(){
				var info = $scope.tmpInformation;

		    	var inf = new Information({
		    		name: info.name,
		    		details: info.details,
		    		patient: $scope.patId,
		    		setBy: $scope.authentication._id
		    	});

		    	inf.$save(function(response){
		    		//window.location.reload();
		    		$scope.toggleAddInformationModal();
		    		$scope.success = "Information Added Successfully"
		    	}, function(errorResponse){
		    		$scope.error = errorResponse.data.message;
		    	});
			}

			$scope.patInformation = function(){
				$scope.informationList = [];
				
				var information = Information.query(function(){
					for(var i = 0; i < information.length; i++){
						//alert(JSON.stringify(goals[i]));
						if(information[i].patient === $scope.patId){
							
						 		//alert(JSON.stringify(clinspats[i].patient));
						 	$scope.informationList.push(information[i]);
						 	
						}
					}
				});
				
			}

		    $scope.toggleeditInformationModal = function(){
		        $scope.editInformationModal = !$scope.editInformationModal;
		    }

		    $scope.editInformation = function(id){ 
		   		$scope.tmpInfoId = id;
				$scope.information = Information.get({
					informationId: $scope.tmpInfoId
				}, function(){
					$scope.toggleeditInformationModal();
				});	   	
		    }


		    $scope.toggleviewInformationModal = function(){
		        $scope.viewInformationModal = !$scope.viewInformationModal;
		    }

		    $scope.viewInformation = function(id){ 
		    	$scope.tmpInfoId = id; 
		    	$scope.information = Information.get({
					informationId: $scope.tmpInfoId
				}, function(){
					$scope.toggleviewInformationModal();
				});	   	  	
		    }

			$scope.updateInformation = function(){
				var inf = new Information({
					name: $scope.information.name,
					details: $scope.information.details
				});
				Information.update({informationId:$scope.tmpInfoId}, inf, function(){
					//alert("update ok");
					$scope.success = "Information updated";
					$scope.toggleeditInformationModal();
				}, function(errorResponse){
					$scope.error = errorResponse.data.message;
				});
			}

			$scope.deleteInformation = function(id){
				Information.delete({informationId: id}, function(){
					$scope.success = "Information Deleted";
					window.location.reload();
				});
			}

			$scope.privateModal = false;

			$scope.uploadPrivate = function(){
				$scope.privateModal = !$scope.privateModal;
			}

		}
	]);