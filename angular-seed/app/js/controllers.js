'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
	.controller('MyCtrl1', ['$scope',
		function ($scope) {}])
	.controller('MyCtrl2', ['$scope',
		function ($scope) {}])
	.controller('BeerController', ['$scope',
		function ($scope) {
			$scope.reverse = true;
			$scope.predicate = 'name';
			// criamos um array de cervejas
			var cervejas = [{
					name: 'Kaiser',
					price: 2
				}, {
					name: 'Skol',
					price: 3
				}, {
					name: 'Glacial',
					price: 4
				}, {
					name: 'Polar',
					price: 6
				}, {
					name: 'Heineken',
					price: 10
				}
			];
			$scope.cervejas = cervejas;
		}])
	.controller('UserController', ['$scope', '$http',
		function ($scope, $http) {
			// delete $http.defaults.headers.common['X-Requested-With'];
			$scope.search = 'R3oLoN'
			$scope.$watch('search', function (data) {
				searchUser(data);
			})
			function searchUser(query) {
				var url = 'https://api.github.com/users/'+query;
				var method = 'GET';
				$http({
					url: url,
					method: method
				}).
				success(function (data) {
					console.log('Data: ', data);
					$scope.user = data;
				}).
				error(function (err) {
					console.log('Erro: ', err);
				});
			}
			}

		]);
