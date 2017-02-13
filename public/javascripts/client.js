angular.module('pairsApp', ['ui.router', 'angularModalService']);

angular.module('pairsApp')
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state('home', {
                url: '/home',
                template: "<home><home>"
            });
    });
