'use strict';

(function () {
  angular.module('SearchApp')
    .controller('SearchCtrl', SearchCtrl);

  SearchCtrl.$inject = ['$scope', '$window', '$timeout', '$filter', '$sce', '$log', 'SearchSrvc'];

  function SearchCtrl($scope, $window, $timeout, $filter, $sce, $log, SearchSrvc) {
    angular.element('.dropdown-button').dropdown();

    $scope.results = [];
    let orig = [];

    $scope.SearchTerm = function (query) {
      $scope.displayResults = false;
      $scope.loading = true;
      SearchSrvc.Search(query)
        .then(function (results) {
          $scope.results = results;
          orig = results;
          $timeout(function () {
            $scope.desc = true;
            $scope.displayResults = true;
            $scope.loading = false;
          }, 1000);
        })
        .catch(function (error) {
          $log.error(error);
          Materialize.toast('Cannot retrieve results!');
          $scope.loading = false;
        });
    }

    $scope.sanitize = function (html) {
      return $sce.trustAsHtml(html);
    }

    $scope.scrollTop = function () {
      $('html, body').animate({
          scrollTop: $('body').offset().top
        }, 'slow');
    }

    $scope.sortByRating = function () {
      let args = ($scope.desc)? '-rating': 'rating';
      $scope.results = $filter('orderBy')($scope.results, args);
      $scope.desc = !$scope.desc;
    }

    $scope.filterByRating = function (rate) {
      $scope.results = $filter('filter')(orig, {'rating':rate});
    }

    $scope.clear = function () {
      $scope.results = orig;
    }
  }

})();
