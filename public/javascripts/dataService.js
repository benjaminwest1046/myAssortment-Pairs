angular.module('pairsApp')
.service('dataService', function($http) {
    var dataService = this,
        url = "https://my-assortment-pair.cfapps.io/";
    dataService.developers = [];
    dataService.pairGroups = [];
    dataService.pairs = [];

    //DONE
    dataService.getDevelopers = function() {
      return $http.get('pairs/developers').then(function(response) {
        var tempArray = response.data._embedded.developers;
        tempArray.forEach(function(d) {
            dataService.developers.push(d.name);
        });
        return dataService.developers
      })
    };

    //TODO
    dataService.getPairGroups = function() {
        dataService.pairGroups.length = 0;
      return $http.get("pairs/pairGroups").then(function(response) {
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

    //DONE
    dataService.createPair = function(pair) {
      return $http.post("pairs/new", pair).then(function(response){
        console.log(response);
      })
    };

    //DONE
    dataService.createPairGroup = function(pairGroup) {
      return $http.post("pairs/groups", pairGroup).then(function(res){
        console.log(res);
      })
    };

    //Done
    dataService.deletePair = function(link) {
      var linkObject = {
        'href': link
      }
      return $http.post('pairs/delete', linkObject).then(function(){
        console.log(link);
      }).then(function(){
        dataService.getPairGroups();
      })
    }
});
