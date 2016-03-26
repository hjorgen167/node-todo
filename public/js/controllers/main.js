angular.module('foodController', [])

	// inject the food service factory into our controller
	.controller('mainController', ['$scope','$http','Food', function($scope, $http, Food) {
		$scope.formData = {};
		$scope.loading = true;
		$scope.total_price = 0;


		$scope.update_price = function(){
			Food.totalPrice()
				.success(function(data){
					$scope.total_price = data.total_price;
				});
		}


		// GET =====================================================================
		// when landing on the page, get all food and show them
		// use the service to get all the food

		Food.get()
			.success(function(data) {
				$scope.update_price();
				$scope.all_food = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createfood = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.name != undefined && !isNaN($scope.formData.price)) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Food.create($scope.formData)

					// if successful creation, call our get function to get all the new food
					.success(function(data) {
						$scope.update_price();
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.all_food = data; // assign our new list of food_name
					});
			}
		};

		// DELETE ==================================================================
		// delete a food after checking it
		$scope.deletefood = function(id) {
			$scope.loading = true;

			Food.delete(id)
				// if successful creation, call our get function to get all the new food
				.success(function(data) {
					$scope.update_price();
					$scope.loading = false;
					$scope.all_food = data; // assign our new list of food
				});
		};
	}]);