/*
* singlecommentbox
*/

/*
* When a singlecommentbox event, do this:
*/
Template.sharecard.events({});


/*
* When reactive, do this:
*/
Template.singlecommentbox.helpers({
  text: function(){
    console.log(this);
    return this.text;
  },
  keywords: function() {
    return this.keywords;
  }
});

/*
* When the singlecommentbox renders, do this:
*/
Template.singlecommentbox.rendered = function () {};
