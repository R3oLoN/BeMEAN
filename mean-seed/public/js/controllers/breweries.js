'use strict';

// Helpers

var _brewery = {
	removeItem: function (arr, item) {
		var index = arr.indexOf(item);
		if (index > -1) {
			arr.splice(index, 1);
		}
	},
	cbFindSuccess: function (data, $scope) {
		$scope.breweries = data.data;
		$scope.msg = 'List complete';
		console.log(data);
	},
	cbFindError: function (error, $scope) {
		$scope.status = 'Unable to load breweries: ' + error.message;
	}
};

// Controllers
angular.module('controllers.Breweries', [])
	.controller('AppCtrl', function ($scope, $http) {
		$http({
			method: 'GET',
			url: '/api/name'
		}).success(function (data, status, headers, config) {
			$scope.name = data.name;
		}).error(function (data, status, headers, config) {
			$scope.name = 'Error!';
		});
	})
	.controller('RemoveBreweries', ['$scope', '$http', 'BreweryService',
		function ($scope, $http, BreweryService) {
			var Brewery = BreweryService;
			$scope.remove = function (brewery) {
				if (confirm('Are you sure? Breweries ' + brewery.name + ' will be removed.')) {
					Brewery.remove(brewery).success(function (data) {
						_brewery.removeItem($scope.breweries, brewery);
					}).error(function (error) {
						$scope.status = 'Unable to load breweries: ' + error.message;
					});
				}
			};
	}])
	.controller('BreweriesListController', ['$scope', '$http', 'BreweryService',
		function ($scope, $http, BreweryService) {
			var Brewery = BreweryService;
			Brewery.find().then(function (data) {
				_brewery.cbFindSuccess(data, $scope);
			}, function (err) {
				_brewery.cbFindError(err, $scope);
			});
	}])
	.controller('BreweriesCreateController', ['$scope', '$http',
	function ($scope, $http) {
			var url = 'api/breweries/';
			var method = 'POST';
			$scope.message = 'Crate Breweries';
			$scope.create = function (brewery) {
				$http({
					url: url,
					method: method,
					data: brewery
				}).success(function (data) {
					console.log(data);
					$scope.data = data;
					$scope.msg = 'Cerveja ' + brewery.name + ' cadastrada com sucesso';
				}).error(function (err) {
					console.log(err);
					$scope.msg = 'Cerveja não pode ser cadastrada';
				});
			};
	}])
	.controller('BreweriesShowController', ['$scope', '$http', '$routeParams', '$location',
		function ($scope, $http, $routeParams, $location) {
			var id = $routeParams.id;
			var url = 'api/breweries/_id/' + id;
			var method = 'GET';
			$scope.message = 'Show Breweries';
			$http({
				url: url,
				method: method
			}).success(function (data) {
				console.log('Breweries: ', data);
				$scope.brewery = data;
			}).error(function (err) {
				console.log(err);
			});
			$scope.remove = function (brewery) {
				var id = brewery._id;
				var url = 'api/breweries/' + id;
				var method = 'DELETE';
				$http({
					url: url,
					method: method
				}).success(function (data) {
					console.log(data);
					$scope.brewery = data;
					$scope.message = 'Breweries ' + brewery.name + 'removed successfully!';
					$location.path('/breweries');
				}).error(function (err) {
					console.log(err);
					$scope.message = 'Breweries cant be removed!';
				});
			};
	}])
	.controller('BreweriesEditController', ['$scope', '$http', '$routeParams',
		function ($scope, $http, $routeParams) {
			var id = $routeParams.id;
			var url = 'api/breweries/_id/' + id;
			var method = 'GET';
			$scope.message = 'Update Breweries';
			// Pega os valores da cerveja a ser alterada
			$http({
				url: url,
				method: method
			}).success(function (data) {
				console.log(data);
				$scope.brewery = data;
			}).error(function (err) {
				console.log(err);
			});
			$scope.update = function (brewery) {
				var method = 'PUT';
				$http({
					url: url,
					method: method,
					data: brewery
				}).success(function (data) {
					console.log(data);
					$scope.data = data;
					$scope.msg = 'Breweries ' + brewery.name + ' update successfully';
				}).error(function (err) {
					console.log(err);
					$scope.msg = 'Breweries cant be updated';
				});
			};
	}])
	.controller('BreweriesRemoveController', ['$scope', '$http', '$routeParams',
		function ($scope, $http, $routeParams) {
			$scope.title = 'Workshop Be MEAN';
			var method = 'GET';
			var id = $routeParams.id;
			var url = '/api/breweries/_id/' + id;
			$http({
				method: method,
				url: url
			}).success(function (data) {
				$scope.brewery = data;
				$scope.msg = 'About ' + $scope.brewery.name;
			}).error(function (data) {
				$scope.msg = 'Error in get brewery';
			});
			$scope.remove = function (cerveja) {
				var method = 'DELETE';
				var url = '/api/breweries/_id/' + cerveja._id;
				console.log(url);
				if (confirm('Are you sure?')) {
					$http({
						method: method,
						url: url
					}).success(function (data) {
						$scope.msg = 'Breweries ' + cerveja.name + ' deleted successfully';
					}).error(function (data) {
						$scope.msg = 'ERROR on DELETE';
					});
				}
			};
	}]);
