angular.module('pairsApp')
.service('dataService', function($http) {
    var dataService = this,
        url = "https://my-assortment-pair.cfapps.io/";
    dataService.developers = [];
    dataService.pairGroups = [];
    dataService.pairs = [];

    dataService.getDevelopers = function() {
      return $http.get(url + 'developers').then(function(response) {
        var tempArray = response.data._embedded.developers;
        tempArray.forEach(function(d) {
            dataService.developers.push(d.name);
        });
        return dataService.developers
      })
    };

    dataService.getPairGroups = function() {
        dataService.pairGroups.length = 0;
      return $http.get(url + "pairGroups").then(function(response) {
        var tempArray = response.data._embedded.pairGroups;
        tempArray.reverse();
        tempArray.forEach(function(p) {
            dataService.pairGroups.push(p);
        })
      }).then(function() {
          dataService.pairGroups.forEach(function(pg) {
          return $http.get(pg._links.pairs.href).then(function(response){
            pg.pairs = [];
            var tempArray = response.data._embedded.pairs;
            tempArray.forEach(function(p) {
              pg.pairs.push(p);
            })
          })
        });
        return dataService.pairGroups;
      })
    };

    dataService.createPair = function(pair) {
      return $http.post(url + "pairs", pair).then(function(response){

      })
    };

    dataService.createPairGroup = function(pairGroup) {
      return $http.post(url + "pairGroups", pairGroup).then(function(res){
        console.log(res);
      })
    };

    dataService.deletePair = function(link) {
      return $http.delete(link).then(function(){
        console.log(link);
      })
    }
});
