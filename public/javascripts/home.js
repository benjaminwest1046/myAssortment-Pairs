angular.module('pairsApp')
    .component('home', {
        template: `
        <div class="heading">
          <h1 class="">Assortment Pairs</h1>
          <h2 id="pairGroupAdd-header">Create New Day</h2><span><i ng-click="createPairGroup()" class="pairGroupAdd icon_plus_circle_outline
e9d1" aria-hidden="true"></i></span>
        </div>
        <div class="createModal card dialog" ng-show="showModal">
          <div class="card-toolbar">
            <span class="card-title"><h3>Create New Pair</h3></span>
            <i class="icon_close" ng-click="changeModal()" aria-hidden="true"></i>
          </div>
          <div class="card-content">
          <form ng-submit="newPair()" ng-show="showModal">

          <fieldset>
            <div class="select-container">
              <select class="" name="anchor" id="anchor" ng-model="pair.anchor" title="First Developer">
               <option value="" disabled selected hidden>First Developer</option>
               <option ng-repeat="developer in developers" value="{{ developer }}">{{developer}}</option>
              </select>
              <label for="anchor">First Developer</label>
            </div>
          </fieldset>

          <fieldset>
          <div class="select-container">
            <select class="" name="developer" id="developer" ng-model="pair.developer" title="Second Developer">
              <option ng-repeat="developer in developers track by developer" value="{{ developer }}">{{developer}}</option>
            </select>
            <label for="developer">Second Developer</label>
          </div>
          </fieldset>

          <fieldset>
            <div class="select-container">
              <select class="" name="thirdDeveloper" id="thirdDeveloper" ng-model="pair.thirdDeveloper" title="Third Developer">
                <option ng-repeat="developer in developers track by developer" value="{{ developer }}">{{developer}}</option>
              </select>
              <label for="thirdDeveloper">Additional Developer</label>
            </div>
          </fieldset>

          <fieldset>
            <div class="checkbox-container">
              <input checked type="checkbox"
                     name="resiliency"
                     ng-model="pair.isResilience"
                     value="checkbox1">
              <label for="checkbox1"><span><span></span></span>Set Pair As Resilliency</label>
           </div>
          </fieldset>

          <div class="card-actions right">
            <button type="submit"  id="submitButton" class="button primary">Create Pair</button>
            <span id="cancelButton" class="button secondary" ng-click="changeModal()">Cancel</span>
          </div>
        </form>
        </div>
        </div>

        <table class="table table-striped" ng-repeat="pairGroup in pairGroups">
            <tr><th colspan="3" class="title"><h2> {{ pairGroup.date }} </h2></th></tr>
            <tr>
              <th class="anchor">Anchor</th>
              <th class="developer">Developer</th>
              <th class="thirdDeveloper">Third Developer <i class="icon_plus_circle_outline
e9d1 pairAdd"  ng-click="sendPairGroup(pairGroup._links.pairGroup.href)" aria-hidden="true"></i></th>
              <th></th>
            </tr>
            <tr ng-repeat="pair in pairGroup.pairs" ng-class="{ 'resiliency-pair': pair.isResilience }">
              <td>{{ pair.anchor }}</td>
              <td>{{ pair.developer }}</td>
              <td>{{ pair.thirdDeveloper }}<span ng-click="deletePair(pair._links.pair.href)"><i class="fa fa-trash-o" aria-hidden="true"></i></span>
</td>

            </tr>
        </table>




  `,
        controller: function ($scope, dataService, $http) {
            var currentDate;
            $scope.showModal = false;
            $scope.pair = {};
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
                currentDate = $scope.pairGroups[0].date;
                console.log(currentDate);
            });


            $scope.sendPairGroup = function (pg) {
                $scope.pair.pairGroup = pg;
                $scope.changeModal();
            };


            $scope.newPair = function () {
                dataService.createPair($scope.pair).then(function (response) {
                  console.log(response);
                  if ($scope.pair.isResilience) {
                    $scope.slack($scope.pair)
                  }
                  console.log('is it going in here')
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
                if ($scope.getDate() != currentDate){
                var pairGroup = {
                    date: $scope.getDate()
                }
                dataService.createPairGroup(pairGroup).then(function () {
                    dataService.getPairGroups();
                });
                }
            }

            $scope.slack = function(pair) {
               return $http.post('/slack', pair).then(function(response){
                });
            }

        }
    });
