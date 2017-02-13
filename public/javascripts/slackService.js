angular.module('pairsApp')
.service('slackService', function($http){

    function postResilliency() {
        return $resource('api/resilliency', null, {
            'update' : {method: 'POST'}
        })
    }
});