angular.module('myApp')
.component('home', {
  template: `
  <h1>My Assortment Pairs</h1>
  <h2>View Pairs by Days</h2>
  <ul>
    <li ng-repeat="pairGroup in $ctrl.pairGroups"><h2 ng-click="$ctrl.viewPairGroup(pairGroup)">{{pairGroup.date}}</h2>
      <ul>
        <li ng-repeat="pair in pairGroup.pairs">Anchor: {{ pair.anchor }} | Developer: {{ pair.developer }}</li>
      </ul>
    </li>
  </ul>
  `,
  controller: function(dataService) {
    var that = this;
    that.developers;
    that.pairGroups;
    that.pairs;
    that.todaysPairs;

    dataService.getDevelopers().then(function(response){
      that.developers = response;
    });

    dataService.getPairGroups().then(function(response){
      that.pairGroups = response;
      console.log(response);
    });

    // dataService.getPairs().then(function(response){
    //   return that.pairs = response;
    // })

    that.getDate = function(){
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();
      return today = mm+'/'+dd+'/'+yyyy;
    }
  }
});
