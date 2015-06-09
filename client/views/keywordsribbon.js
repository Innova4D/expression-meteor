/*
* keywords Ribbon Logic.
*/

/*
* When reactive, do this:
*/
Template.keywordsribbon.helpers({
  keywords: function(){
    return Object.keys(this.keywords).filter(function(e){return e});
  }
});
