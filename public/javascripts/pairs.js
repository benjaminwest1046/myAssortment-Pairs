angular.module('pairsApp')
.component('pairs', {
  template: `
  <h1>New Pairs</h1>
  `,
  controller: function(dataService, $state, $stateParams) {
    console.log('pairGroup is working')
  }
})
