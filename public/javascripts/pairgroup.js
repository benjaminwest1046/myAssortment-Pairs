angular.module('myApp')
.component('pairgroup', {
  template: `
  <h1>PairGroup Page</h1>
  `,
  controller: function(dataService, $state, $stateParams) {
    console.log('pairGroup is working')
  }
})
