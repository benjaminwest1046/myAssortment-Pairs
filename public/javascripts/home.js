angular.module('myApp')
.component('home', {
  template: `
  <div class="remodal-bg">
    <div class="header">
      <h1>My Assortment Pairs</h1>
      <h2>View Pairs by Days</h2>
      <span><i ng-click="$ctrl.createPairGroup()" class="pairGroupAdd fa fa-plus-circle" aria-hidden="true"></i></span>
    </div>

    <table class="table table-striped" ng-repeat="pairGroup in $ctrl.pairGroups">
        <tr><th colspan="3" class="title"><h3> {{ pairGroup.date }} </h3></th></tr>
        <tr>
          <th>Anchor</th>
          <th>Developer</th>
          <th>Third Developer</th>
          <th><span data-remodal-target="modal" ng-click="$ctrl.sendPairGroup(pairGroup._links.pairGroup.href)"><i class="fa fa-plus-circle" aria-hidden="true"></i></span></th>
        </tr>
        <tr ng-repeat="pair in pairGroup.pairs" ng-class="{ 'resiliency-pair': pair.isResilience }">
          <td>{{ pair.anchor }}</td>
          <td>{{ pair.developer }}</td>
          <td>{{ pair.thirdDeveloper }}</td>
          <td class="actions">
          <span ng-click="$ctrl.deletePair(pair._links.pair.href)"><i class="fa fa-trash-o" aria-hidden="true"></i></span>
          </td>
        </tr>
    </table>
  </div>

  <div class="remodal" data-remodal-id="modal">
  <button data-remodal-action="close" class="remodal-close"></button>
   <div class="edit-container">
    <h3>Create a New Pair</h3><br>

    <form ng-submit="$ctrl.newPair()">

      <div class="form-group">
        <select class="form-control" name="anchor" id="anchor" ng-model="$ctrl.pair.anchor">
          <option ng-repeat="developer in $ctrl.developers" value="{{ developer }}">{{developer}}</option>
        </select>
      </div>

      <div class="form-group">
        <select class="form-control" name="developer" id="developer" ng-model="$ctrl.pair.developer">
          <option ng-repeat="developer in $ctrl.developers track by developer" value="{{ developer }}">{{developer}}</option>
        </select>
      </div>

      <div class="form-group">
        <select class="form-control" name="thirdDeveloper" id="thirdDeveloper" ng-model="$ctrl.pair.thirdDeveloper">
          <option ng-repeat="developer in $ctrl.developers track by developer" value="{{ developer }}">{{developer}}</option>
        </select>
      </div>

      <div class="form-group">
        <label class="resiliency-label" for="resiliency">Resilliency? </label>
        <input type="checkbox"
               class="form-control"
               name="resiliency"
               ng-model="$ctrl.pair.isResilience">
      </div>

      <button type="submit"  class="remodal-confirm">Create</button>
      <button data-remodal-action="cancel" ng-click="$ctrl.clear()" class="remodal-cancel">Cancel</button>
    </form>
  </div>
</div>

  `,
  controller: function($scope, dataService) {
    var that = this;
    that.developers;
    that.pairGroups;
    that.pairs;

    dataService.getDevelopers().then(function(response){
      that.developers = response;
      that.pair = {
          anchor: that.developers[0],
          developer: that.developers[0],
          pairGroup: '',
          thirdDeveloper: '',
          date: '1/1/2017',
          isResilience: false
      }
    });

    dataService.getPairGroups().then(function(response){
      that.pairGroups = response;
    });



    that.sendPairGroup = function(pg){
      that.pair.pairGroup = pg;
    }

    that.newPair = function() {
      dataService.createPair(that.pair).then(function(response){
        that.pair = {
            anchor: '',
            developer: '',
            thirdDeveloper: '',
            date: 'a',
            pairGroup: that.pair.pairGroup
        }
      })
    }

    that.deletePair = function(pair) {
        dataService.deletePair(pair).then(function(){
          location.reload();
        })
    }

    that.getDate = function(){
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1;
      if(dd<10){
        dd='0'+dd;
      }
      if(mm<10){
        mm='0'+mm;
      }
      var yyyy = today.getFullYear();
      return today = mm+'/'+dd+'/'+yyyy;
    }

    that.createPairGroup = function() {
      console.log("calling this")
      var pairGroup = {
        date: that.getDate()
      }
      dataService.createPairGroup(pairGroup);
    }

  }
});
