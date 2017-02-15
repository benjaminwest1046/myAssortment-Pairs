describe('Home Controller', function () {

    var dataService,
        httpBackend,
        timeout;


    beforeEach(angular.mock.module('pairsApp'));

    beforeEach(inject(function (_dataService_, _$httpBackend_, _$timeout_, $q) {
        dataService = _dataService_;
        $httpBackend = _$httpBackend_;
        timeout = _$timeout_;
    }));

    it('should return a list of developers', function () {
        $httpBackend
            .when('GET', 'https://my-assortment-pair.cfapps.io/developers')
            .respond(200,{ _embedded: {
                developers: [{name: "Benjamin"}, {name: "Jessica"}]
            }});

        dataService.getDevelopers();
        $httpBackend.flush();
        expect(dataService.developers).toEqual(['Benjamin', 'Jessica']);

    });

    it('should return a list of pairGroups', function () {
        $httpBackend
            .when('GET', 'https://my-assortment-pair.cfapps.io/pairGroups')
            .respond(200, {
                "_embedded": {
                    "pairGroups": [
                        {
                            "date": "02/07/2017",
                            "id": 242,
                            "_links": {
                                "self": {
                                    "href": "https://my-assortment-pair.cfapps.io/pairGroups/242"
                                },
                                "pairGroup": {
                                    "href": "https://my-assortment-pair.cfapps.io/pairGroups/242"
                                },
                                "pairs": {
                                    "href": "https://my-assortment-pair.cfapps.io/pairGroups/242/pairs"
                                }
                            }
                        }
                    ]
                },
                "_links": {
                    "self": {
                        "href": "https://my-assortment-pair.cfapps.io/pairGroups"
                    },
                    "profile": {
                        "href": "https://my-assortment-pair.cfapps.io/profile/pairGroups"
                    }
                }
            });

        $httpBackend
            .when('GET', 'https://my-assortment-pair.cfapps.io/pairGroups/242/pairs')
            .respond(200, {
                _embedded: {
                    pairs: [{
                        anchor: "Ben",
                        developer: "Jessica",
                        date: "1/1/2020",
                        id: 832
                    }]
                }
            });

        dataService.getPairGroups();
        $httpBackend.flush();
        expect(dataService.pairGroups).toEqual([{"date":"02/07/2017","id":242,"_links":{"self":{"href":"https://my-assortment-pair.cfapps.io/pairGroups/242"},"pairGroup":{"href":"https://my-assortment-pair.cfapps.io/pairGroups/242"},"pairs":{"href":"https://my-assortment-pair.cfapps.io/pairGroups/242/pairs"}},"pairs":[{"anchor":"Ben","developer":"Jessica","date":"1/1/2020","id":832}]}]);

    });

    it('should create a pairGroup', function () {
        var pair = {
            pairGroup: "https://my-assortment-pair.cfapps.io/pairs/pairGroups/242",
            anchor: "testeroo",
            developer: "huhuh",
            thirdDeveloper: "Chad",
            isResilience: true,
            date: "1/24/2017"
        };
        $httpBackend
            .when('POST', 'https://my-assortment-pair.cfapps.io/pairs')
            .respond(200, {
                "anchor": "testeroo",
                "developer": "huhuh",
                "thirdDeveloper": "Chad",
                "date": "1/24/2017",
                "isResilience": true,
                "id": 852,
                "_links": {
                    "self": {
                        "href": "https://my-assortment-pair.cfapps.io/pairs/852"
                    },
                    "pair": {
                        "href": "https://my-assortment-pair.cfapps.io/pairs/852"
                    },
                    "pairGroup": {
                        "href": "https://my-assortment-pair.cfapps.io/pairs/852/pairGroup"
                    }
                }
            });
        var something = dataService.createPair(pair);
        $httpBackend.flush();
    });

    it('returns a list of pairs', function () {
        var pairGroups;
        dataService.getPairGroups().then(function (response) {
            pairGroups = response;
            expect(pairGroups).toEqual(['1/1/2017', '1/2/2017']);
        });
    });


});
