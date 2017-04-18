'use strict';

(function () {
  angular.module('SearchApp')
    .controller('SearchCtrl', SearchCtrl);

  SearchCtrl.$inject = ['$scope', '$window', '$timeout', '$filter', '$sce', '$log', 'SearchSrvc'];

  function SearchCtrl($scope, $window, $timeout, $filter, $sce, $log, SearchSrvc) {
    angular.element('.dropdown-button').dropdown();
    $scope.bookOption = 'Filter by Book';
    $scope.ratingOption = 'Filter by Rating';
    $scope.results = [];
    $scope.orig = [];

    let options = {
      'book_title': '',
      'rating': ''
    };

    $scope.SearchTerm = function (query) {
      $scope.displayResults = false;
      $scope.loading = true;
      $scope.bookOption = 'Filter by Book';
      $scope.ratingOption = 'Filter by Rating';
      options = {
        'book_title': '',
        'rating': ''
      };
      SearchSrvc.Search(query)
        .then(function (results) {
          $scope.results = results.results;
          $scope.books = results.books;
          $scope.orig = results.results;
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

    $scope.filterBook = function (book) {
      options.book_title = book.toString();
      filter();
      $scope.bookOption = ' ' + book + ' ';
    }

    $scope.filterRating = function (rate) {
      options.rating = rate;
      filter();
      $scope.ratingOption = ' ' + rate + ' stars';
    }

    $scope.clearBook = function () {
      options.book_title = '';
      filter();
      $scope.bookOption = 'Filter by Book';
    }

    $scope.clearRating = function () {
      options.rating = '';
      filter();
      $scope.ratingOption = 'Filter by Rating';
    }

    function filter() {
      console.log(options);
      $scope.results = $filter('filter')($scope.orig, options);
    }

  }

})();
