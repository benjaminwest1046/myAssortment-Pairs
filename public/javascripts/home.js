angular.module('pairsApp')
    .component('home', {
        template: `
    <div class="heading">
      <h1 class="header">My Assortment Pairs</h1>
      <h2>View Pairs by Days</h2>
      <span><i ng-click="createPairGroup()" class="pairGroupAdd fa fa-plus-circle" aria-hidden="true"></i></span>
    </div>
  <div class="createModal" ng-show="showModal">
  <i class="fa fa-times-circle" ng-click="changeModal()" aria-hidden="true"></i>
   <div class="edit-container">
    <h3>Create a New Pair</h3><br>

    <form ng-submit="newPair()" ng-show="showModal">

      <div class="form-group">
        <select class="form-control" name="anchor" id="anchor" ng-model="pair.anchor" required>
          <option ng-repeat="developer in developers" value="{{ developer }}">{{developer}}</option>
        </select>
      </div>

      <div class="form-group">
        <select class="form-control" name="developer" id="developer" ng-model="pair.developer" required>
          <option ng-repeat="developer in developers track by developer" value="{{ developer }}">{{developer}}</option>
        </select>
      </div>

      <div class="form-group">
        <select class="form-control" name="thirdDeveloper" id="thirdDeveloper" ng-model="pair.thirdDeveloper">
          <option ng-repeat="developer in developers track by developer" value="{{ developer }}">{{developer}}</option>
        </select>
      </div>

      <div class="form-group">
        <label class="resiliency-label">Resilliency? </label>
        <input type="checkbox"
               class="form-control"
               name="resiliency"
               ng-model="pair.isResilience">
      </div>

      <button type="submit"  id="submitButton" class="btn btn-success">Submit</i></button>
    </form>
  </div>
</div>

    <table class="table table-striped" ng-repeat="pairGroup in pairGroups">
        <tr><th colspan="3" class="title"><h3> {{ pairGroup.date }} </h3></th></tr>
        <tr>
          <th class="anchor">Anchor</th>
          <th class="developer">Developer</th>
          <th class="thirdDeveloper">Third Developer</th>
          <th><i class="fa fa-plus-circle pairAdd"  ng-click="sendPairGroup(pairGroup._links.pairGroup.href)" aria-hidden="true"></i></th>
        </tr>
        <tr ng-repeat="pair in pairGroup.pairs" ng-class="{ 'resiliency-pair': pair.isResilience }">
          <td>{{ pair.anchor }}</td>
          <td>{{ pair.developer }}</td>
          <td>{{ pair.thirdDeveloper }}</td>
          <td class="actions">
          <span ng-click="deletePair(pair._links.pair.href)"><i class="fa fa-trash-o" aria-hidden="true"></i></span>
          </td>
        </tr>
    </table>
  


  `,
        controller: function ($scope, dataService) {
            $scope.showModal = false;

            dataService.getDevelopers().then(function (response) {
                $scope.developers = response;
                $scope.pair = {
                    anchor: $scope.developers[0],
                    developer: $scope.developers[0],
                    pairGroup: '',
                    thirdDeveloper: '',
                    date: '1/1/2017',
                    isResilience: false
                };
            });

            $scope.changeModal = function(){
              $scope.showModal = !$scope.showModal;
            };

            dataService.getPairGroups().then(function (response) {
                $scope.pairGroups = response;
            });


            $scope.sendPairGroup = function (pg) {
                $scope.changeModal();
                $scope.pair.pairGroup = pg;
            };

            $scope.newPair = function () {
                dataService.createPair($scope.pair).then(function (response) {
                    $scope.pair = {
                        anchor: $scope.developers[0],
                        developer: $scope.developers[0],
                        thirdDeveloper: '',
                        date: '.',
                        pairGroup: $scope.pair.pairGroup
                    }
                }).then(function () {
                    dataService.getPairGroups();
                })
            };

            $scope.deletePair = function (pair) {
                console.log(pair);
                dataService.deletePair(pair)
            };

            $scope.getDate = function () {
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1;
                if (dd < 10) {
                    dd = '0' + dd;
                }
                if (mm < 10) {
                    mm = '0' + mm;
                }
                var yyyy = today.getFullYear();
                return today = mm + '/' + dd + '/' + yyyy;
            }

            $scope.createPairGroup = function () {
                console.log("calling this for real");
                var pairGroup = {
                    date: $scope.getDate()
                }
                dataService.createPairGroup(pairGroup).then(function () {
                    dataService.getPairGroups();
                })
            }

        }
    });
