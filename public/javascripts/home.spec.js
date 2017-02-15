// describe('Home Controller', function() {
//
//   var dataService;
//
//   beforeEach(angular.mock.module('pairsApp'));
//
//   beforeEach(inject(function(_dataService_, _$httpBackend_){
//     dataService = _dataService_;
//     $httpBackend = _$httpBackend_;
//
//     $httpBackend.whenGET('https://my-assortment-pair.cfapps.io/developers')
//     .respond({
//         _embedded: {
//           developers: [{ name: "Benjamin"}, { name: "Jessica"}]
//         }
//     });
//
//     $httpBackend.whenGET('https://my-assortment-pair.cfapps.io/pairGroups')
//     .respond({
//         _embedded: {
//           pairGroups: [{ date: "1/1/2017"}, { date: "1/2/2017"}]
//         }
//     });
//
//   }));
//
//   fit('returns the current date', function(){
//     expect('1/30/2017').toEqual('1/30/2017')
//   });
//
//   it('returns a list of developers', function(){
//     var developers;
//     dataService.getDevelopers().then(function(response){
//       developers = response;
//       expect(developers).toEqual(['Benjamin', 'Casey']);
//     });
//   });
//
//
//     it('returns a list of pair groups', function(){
//       var pairGroups;
//       dataService.getPairGroups().then(function(response){
//         pairGroups = response;
//         expect(pairGroups).toEqual(['1/1/2017', '1/2/2017']);
//       });
//     });
//
//     it('returns a list of pair groups', function(){
//       var pairGroups;
//       dataService.getPairGroups().then(function(response){
//         pairGroups = response;
//         expect(pairGroups).toEqual(['1/1/2017', '1/2/2017']);
//       });
//     });
//
//
// });
