'use strict';

(function () {
  angular.module('SearchApp')
    .factory('SearchSrvc', SearchSrvc);

  SearchSrvc.$inject = ['$http', '$q'];

  function SearchSrvc($http, $q) {
    let dbUrl = 'api';

    let service = {};
    service.Search = Search;
    return service;

    function Search(searchQuery) {
      let deferred = $q.defer();
      $http.get(dbUrl+'/search/'+searchQuery)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error.data);
        });

      return deferred.promise;
    }
  }

})();
