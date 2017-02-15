describe('myAssortment Pairs', function() {

  beforeEach(function() {
    browser.get('http://localhost:3000');
});

  it('should have a title and header', function() {
    expect(browser.getTitle()).toEqual('myAssortment Pairs');
    expect(element(by.css('.header')).getText()).toEqual('My Assortment Pairs')
  });

    it('should be able to create a new pair group', function() {
        var firstPair = element(by.css('.fa-trash-o'));
        element(by.css('.fa-trash-o')).click();
        expect(element(by.css('.fa-trash-o')).not.toEqual(firstPair));
    });

    it('should be able to create a new pair group', function() {
    getDate = function(){
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1;
      if(dd<10){
        dd='0'+dd;
      }
      if(mm<10){
        mm='0'+mm;
      }
      var yyyy = today.getFullYear();
      return today = mm+'/'+dd+'/'+yyyy;
    }
    var existingPairGroup = element(by.css('.title'));
    element(by.css('.pairGroupAdd')).click();
    existingPairGroup = element(by.css('.title'));
    expect(existingPairGroup.getText()).toEqual(getDate())
  });

    fit('should create a new pair', function(){
      var row = element.all(by.css('.pairAdd'));
      row.click();
      browser.sleep(10000);
      var button = element(by.css('#submitButton'));
      button.click();
      // var newPair = element.all(by.css('anchor')).get(0);
      // expect(newPair.getText()).toBe('Benjamin');

    })
});
