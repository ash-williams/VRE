'use strict';

angular
	.module('accountManagement')
	.controller('AccountsController', ['$scope', '$routeParams', 'Authentication', 'Accounts', 'Administrators', 'Clinicians', 'Patients', 'CliniciansPatients', 
		function($scope, $routeParams, Authentication, Accounts, Administrators, Clinicians, Patients, CliniciansPatients){
			this.authentication = Authentication;
			this.account = {};
			//$scope.error = "HELLO";

			this.create = function(){
				
				var account = this.account;
				
				var acc =  new Accounts({
					title: account.title,
					firstName: account.firstName,
					lastName: account.lastName,
					email: account.email,
					username: account.username,
					password: account.password,
					accountType: account.accountType
				});
				

				acc.$save(function(response) {
		    	// If an account was created successfully, create the admin, patient, clinician
		    		if(account.accountType === "Patient"){
						var pat = new Patients({
				        	account: response._id
				        });
				        pat.$save(function(response){
				        	alert("Added successfully");
				        	//$scope.success = "Patient added";
				        	
				        }, function(errorResponse){
				        	this.error = errorResponse.data.message;
				        });
					}else if(account.accountType === "Clinician"){
						var clin = new Clinicians({
				        	account: response._id,
				        	specialty: account.specialty
				        });
				        clin.$save(function(response){
				        	alert("Added successfully");
				        	//$scope.success = "Clinician added";
				        	
				        }, function(errorResponse){
				        	this.error = errorResponse.data.message;
				        });
					}else if(account.accountType === "Administrator"){
				        var admin = new Administrators({
				        	account: response._id
				        });
				        admin.$save(function(response){
				        	alert("Added successfully");
				        	//$scope.success = "Administrator added";
				        	
				        }, function(errorResponse){
				        	this.error = errorResponse.data.message;
				        });
					}else{
						this.error = "Something went wrong!";
					}
			    }, function(errorResponse) {
			        this.error = errorResponse.data.message;
			    });
				$scope.error = this.error;
				window.location.reload();		
			}; 

			this.getPatients = function(){
				this.patients = Patients.query();
			};

			this.getClinicians = function(){
				this.clinicians = Clinicians.query();
			};

			this.getAdministrators = function(){
				this.administrators = Administrators.query();
			};

			this.getAccounts = function(){
				this.accounts = Accounts.query();
			};

			this.findOne = function(){
				this.viewaccount = Accounts.get({
					accountId: $routeParams.accountId
				});
			};
			
			$scope.showModal = false;
			$scope.editModal = false;
			$scope.viewPatModal = false;

		    $scope.toggleModal = function(){
		        $scope.showModal = !$scope.showModal;
		    };

		    $scope.toggleEditModal = function(){
		        $scope.editModal = !$scope.editModal;
		    };

		    $scope.toggleViewPatients = function(id){
		    	$scope.getClinsPatients(id);
		        $scope.viewPatModal = !$scope.viewPatModal;
		    };

		    $scope.viewAccount = function(id){
		    	//alert(id);
		    	
	    		var acc = Accounts.get({ accountId: id }, function(){
					//alert(JSON.stringify(acc));
					$scope.viewaccount = acc;
				
					$scope.toggleModal();
				});	
				
		    };


		    $scope.editAccount = function(id){
		    	//alert(id);
		    	var acc = Accounts.get({ accountId: id }, function(){
					//alert(JSON.stringify(acc));
					$scope.editaccount = acc;
					//alert($scope.viewaccount.firstName);
					$scope.toggleEditModal();
				});	
		    };

		    $scope.update = function() { 
		    	// alert($scope.editaccount); 
		    	var $aid = $scope.editaccount._id;
		    	//var acc = $scope.editaccount;
		    	//alert(acc);
		    	var acc = {
		    		title: $scope.editaccount.title,
		    		firstName: $scope.editaccount.firstName,
		    		lastName: $scope.editaccount.lastName,
		    		email: $scope.editaccount.email,
		    		username: $scope.editaccount.username,
		    	};
		    	try{
		    		Accounts.update({accountId:$aid}, acc);
		    		alert("Account Updated");
		    		window.location.reload();
		    	}catch(e){
		    		alert("Error: Account not updated");
		    	}
		    };

			this.delete = function(object, account, accType){
				//alert("Object: " + object + "\nAccount: " + account + "\naccType: " + accType);
				this.getAccounts();
				if(accType === "Patient"){
					Patients.delete({patientId:object._id}, function(){
						Accounts.delete({accountId:account._id}, function(){
							alert("Patient deleted");
						}, function(){
							alert("Error: Patient deleted but account remains");
						});
					}, function(){
						alert("Error: Patient not deleted");
					});    
				}else if(accType === "Clinician"){
					Clinicians.delete({clinicianId:object._id}, function(){
						Accounts.delete({accountId:account._id}, function(){
							alert("Clinician deleted");
						}, function(){
							alert("Error: Clinician deleted but account remains");
						});
					}, function(){
						alert("Error: Clinician not deleted");
					});
				}else if(accType === "Administrator"){
					Administrators.delete({administratorId:object._id}, function(){
						Accounts.delete({accountId:account._id}, function(){
							alert("Administrator deleted");
						}, function(){
							alert("Error: Administrator deleted but account remains");
						});
					}, function(){
						alert("Error: Administrator not deleted");
					});
				}
				alert();
				window.location.reload();
			};

			$scope.getClinsPatients = function(id){
				alert(id);
			}

		
	}]);
   

       


