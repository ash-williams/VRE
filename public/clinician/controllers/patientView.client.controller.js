'use strict';

angular
	.module('clinician')
	.controller('PatientViewController', ['$scope', '$location', '$routeParams', 'Authentication', 'Accounts', 'Patients', 'Goals',
		function($scope, $location, $routeParams, Authentication, Accounts, Patients, Goals){
			$scope.authentication = Authentication;
			$scope.name = 'patman';
			$scope.patId = $routeParams.patId;
			$scope.tab = 1;
			$scope.success = "";
			

			$scope.addGoalModal = false;
			$scope.addTreatmentModal = false;
			$scope.setCompleteModal = false;
			$scope.viewCompleteModal = false;
			$scope.editGoalModal = false;

			$scope.tmpGoal = {};

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

		    $scope.addGoal = function(){    	
				$scope.toggleAddGoalModal();
		    };

		    $scope.addTreatment = function(){    	
				$scope.toggleAddTreatmentModal();
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


		}
	]);