angular.module('myApp', ['ui.router']);

angular.module('myApp')
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider
  .state('home', {
    url: '/home',
    template: "<home><home>"
  })
  .state('pairGroups', {
    url: '/pairgroup/:id',
    template: "<pairgroup><pairgroup>"
  })
});
