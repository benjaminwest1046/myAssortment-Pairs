angular.module('myApp')
.service('dataService', function($http) {
    var that = this;
    that.developers = [];
    that.pairGroups = [];
    that.pairs = [];
    that.getDevelopers = function() {
      return $http.get("https://my-assortment-pair.cfapps.io/developers").then(function(response) {
        var tempArray = response.data._embedded.developers
        tempArray.forEach(function(d) {
          that.developers.push(d.name);
        })
        return that.developers
      })
    }
    that.getPairGroups = function() {
      return $http.get("https://my-assortment-pair.cfapps.io/pairGroups").then(function(response) {
        var tempArray = response.data._embedded.pairGroups
        tempArray.forEach(function(p) {
          that.pairGroups.push(p);
        })
      }).then(function() {
        that.pairGroups.forEach(function(pg) {
          return $http.get(pg._links.pairs.href).then(function(response){
            pg.pairs = [];
            var tempArray = response.data._embedded.pairs;
            tempArray.forEach(function(p) {
              pg.pairs.push(p);
            })
          })
        })
        return that.pairGroups;
      })
    }
    // that.getPairs = function() {
    //   return $http.get("https://my-assortment-pair.cfapps.io/pairs").then(function(response) {
    //     var tempArray = response.data._embedded.pairs
    //     tempArray.forEach(function(p) {
    //       that.pairs.push(p);
    //     })
    //     return that.pairs
    //   })
    // }

});
