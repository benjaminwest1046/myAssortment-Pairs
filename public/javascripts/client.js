angular.module('pairsApp', ['ui.router', 'ngResource']);

angular.module('pairsApp')
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state('home', {
                url: '/home',
                template: "<home><home>"
            });
    });
