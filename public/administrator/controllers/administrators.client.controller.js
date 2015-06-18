angular.module('administrators').controller('AdministratorsController', ['$scope', '$routeParams', '$location', 'Authentication', 'Administrators', function($scope, $routeParams, $location, Authentication, Administrators){
	$scope.authentication = Authentication;
}
]);

$scope.create = function(){
	var administrator = new Administrators({
		title: this.title,
		firstName: this.firstName,
		lastName: this.lastName,
		email: this.email,
		username: this.username,
		password: this.password
	});

	administrator.$save(function(response){
		$location.path('administrators/' + response._id);
	}, function(errorResponse){
		$scope.error = errorResponse.data.message;
	});
};

$scope.find = function(){
	$scope.administrators = Administrators.query();
};

$scope.findOne = function(){
	$scope.administrator = Administrators.get({
		administratorId: $routeParams.administratorId
	});
};

$scope.update = function(){
	$scope.administrator.$update(function(){
		$location.path('administrators/' + $scope.administrator._id);
	}, function(errorResponse){
		$scope.error = errorResponse.data.message;
	});
};

$scope.delete = function(administrator){
	if(administrator){
		administrator.$remove(function(){
			for(var i in $scope.administrators){
				if($scope.administrators[i] === administrator){
					$scope.administrators.splice(i, 1);
				}
			}
		});
	}else{
		$scope.administrator.$remove(function(){
			$location.path('administrators');
		});
	}
};
