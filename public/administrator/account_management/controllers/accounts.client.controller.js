'use strict';

angular
	.module('accountManagement')
	.controller('AccountsController', ['$scope', '$routeParams', '$window', 'Authentication', 'Accounts', 'Administrators', 'Clinicians', 'Patients',
		function($scope, $routeParams, $window, Authentication, Accounts, Administrators, Clinicians, Patients){
			this.authentication = Authentication;
			this.account = {};
			this.showViewModal = false;
			this.showEditModal = false;
			var modalId = "";
			var viewaccount = null;

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
				        	this.success = "Patient added";
				        	$window.location.reload(true);
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
				        	this.success = "Clinician added";
				        	$window.location.reload(true);
				        }, function(errorResponse){
				        	this.error = errorResponse.data.message;
				        });
					}else if(account.accountType === "Administrator"){
				        var admin = new Administrators({
				        	account: response._id
				        });
				        admin.$save(function(response){
				        	alert("Added successfully");
				        	this.success = "Administrator added";
				        	$window.location.reload(true);
				        }, function(errorResponse){
				        	this.error = errorResponse.data.message;
				        });
					}else{
						this.error = "Something went wrong!";
					}
			    }, function(errorResponse) {
			        this.error = errorResponse.data.message;
			    });
						
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

			this.findOne = function(){
				this.viewaccount = Accounts.get({
					accountId: $routeParams.accountId
				});
			};
			
			this.findByModalId = function(){
				var acc = Accounts.get({ accountId: modalId }, function(){
					//alert(JSON.stringify(acc));
					viewaccount = acc;
					alert(JSON.stringify(viewaccount));
					viewopen();
				});	
			};

			this.setviewopen = function(Id) {
				modalId = Id;
				//alert("hello");
				this.findByModalId();

				//this.viewopen();
				
			};

			$scope.showModal = false;
		    $scope.toggleModal = function(){
		        $scope.showModal = !$scope.showModal;
		    };

		    $scope.viewAccount = function(id){
		    	alert(id);
		    	$scope.toggleModal();
		    }

			this.viewopen = function() {
				alert("hello");
				showViewModal = true;
			};

			this.viewok = function() {
				this.showViewModal = false;
			};

			this.viewcancel = function() {
				this.showViewModal = false;
			};

			this.editopen = function(){
				this.showEditModal = true;
			};

			this.editok = function(){
				this.showEditModal = false;
			};

			this.editcancel = function(){
				this.showEditModal = false;
			};

			this.delete = function(){
				alert("Hello");
			};
		}
	]);

   

       


