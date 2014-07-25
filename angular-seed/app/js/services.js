'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1')
.service('HTTPService',['$http', function($http){
	return function(url){
		this.search = function(url){
				return $http({
					url: url,
					method: 'GET'
				});
		}
	}
}]);
