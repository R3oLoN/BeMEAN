'use strict';

// Helpers
var _beer = {
	removeItem: function (arr, item) {
		var index = arr.indexOf(item);
		if (index > -1) {
			arr.splice(index, 1);
		}
	},
	cbFindSuccess: function (data, $scope) {
		$scope.beers = data.data;
		$scope.msg = 'List complete';
		console.log(data);
	},
	cbFindError: function (error, $scope) {
		$scope.status = 'Unable to load beers: ' + error.message;
	}
};



// Controllers
angular.module('controllers.Beers', [])
	.controller('AppCtrl', function ($scope, $http) {
		$http({
			method: 'GET',
			url: '/api/name'
		}).
		success(function (data, status, headers, config) {
			$scope.name = data.name;
		}).
		error(function (data, status, headers, config) {
			$scope.name = 'Error!';
		});
	})
	.controller('RemoveBeer', ['$scope', '$http', 'BeerService',
  function ($scope, $http, BeerService) {
			var Beer = BeerService;
			$scope.remove = function (beer) {
				if (confirm('Are you sure? Beer ' + beer.name + ' will be removed.')) {
					Beer.remove(beer).
					success(function (data) {
						_beer.removeItem($scope.beers, beer);
					}).
					error(function (error) {
						$scope.status = 'Unable to load beers: ' + error.message;
					});
				}
			};
  }])
	.controller('BeerListController', ['$scope', '$http', 'BeerService',
  function ($scope, $http, BeerService) {
			var Beer = BeerService;
			Beer.find().then(function (data) {
				console.log('find', data);
				_beer.cbFindSuccess(data, $scope);
			}, function (err) {
				_beer.cbFindError(err, $scope);
			});
			$scope.atualizarBeers = function (beers) {
				$scope.beers = beers;
				console.log('atualizarBeers beers', $scope.beers);
			};
  }])
	.controller('BeerCreateController', ['$scope', '$http',
  function ($scope, $http) {
			var url = 'api/beers/';
			var method = 'POST';
			$scope.message = 'Crate Beer';
			$scope.create = function (beer) {
				$http({
					url: url,
					method: method,
					data: beer
				}).
				success(function (data) {
					console.log(data);
					$scope.data = data;
					$scope.msg = 'Cerveja ' + beer.name + ' cadastrada com sucesso';
				}).
				error(function (err) {
					console.log(err);
					$scope.msg = 'Cerveja não pode ser cadastrada';
				});
			};
 }])
	.controller('BeerShowController', ['$scope', '$rootScope', '$http', '$routeParams', '$location',
  function ($scope, $rootScope, $http, $routeParams, $location) {
			var id = $routeParams.id;
			var url = 'api/beers/_id/' + id;
			var method = 'GET';

			$scope.message = 'Show Beer';

			$http({
				url: url,
				method: method
			}).
			success(function (data) {
				console.log('Beer: ', data);
				$scope.beer = data;
			}).
			error(function (err) {
				console.log(err);
			});

			$scope.remove = function (beer) {
				var id = beer._id;
				var url = 'api/beers/' + id;
				var method = 'DELETE';

				$http({
					url: url,
					method: method
				}).
				success(function (data) {
					console.log(data);
					$scope.beer = data;
					$scope.message = 'Beer ' + beer.name + 'removed successfully!';
					$location.path('/beers');
				}).
				error(function (err) {
					console.log(err);
					$scope.message = 'Beer cant be removed!';
				});
			};
}]).
controller('BeerEditController', ['$scope', '$rootScope', '$http', '$routeParams', '$location',
  function ($scope, $rootScope, $http, $routeParams, $location) {
		var id = $routeParams.id;
		var url = 'api/beers/_id/' + id;
		var method = 'GET';
		$http({
			url: url,
			method: method
		}).
		success(function (data) {
			console.log(data);
			$scope.beer = data;
		}).
		error(function (err) {
			console.log(err);
		});

		$scope.update = function (beer) {
			var method = 'PUT';
			$http({
				url: url,
				method: method,
				data: beer
			}).
			success(function (data) {
				console.log(data);
				$scope.data = data;
				$scope.message = 'Beer ' + beer.name + ' update successfully';
				//$location.path('/beers');
			}).
			error(function (err) {
				console.log(err);
				$scope.msg = 'Beer cant be updated';
			});
		};
  }]).
controller('BeerRemoveController', ['$scope', '$http', '$routeParams',
    function ($scope, $http, $routeParams) {
		$scope.title = 'Workshop Be MEAN';

		var method = 'GET';
		var id = $routeParams.id;
		var url = '/api/beers/_id/' + id;
		$http({
			method: method,
			url: url
		})
			.success(function (data) {
				$scope.beer = data;
				$scope.msg = 'About ' + $scope.beer.name;
			})
			.error(function (data) {
				$scope.msg = 'Error in get beer';
			});

		$scope.remove = function (cerveja) {
			var method = 'DELETE';
			var url = '/api/beers/_id/' + cerveja._id;
			console.log(url);
			if (confirm('Are you sure?')) {
				$http({
					method: method,
					url: url
				})
					.success(function (data) {
						$scope.msg = 'Beer ' + cerveja.name + ' deleted successfully';
					})
					.error(function (data) {
						$scope.msg = 'ERROR on DELETE';
					});
			}
		};

  }]);
