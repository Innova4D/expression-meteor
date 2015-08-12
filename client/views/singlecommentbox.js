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
    return this.text;
  },
  keywords: function() {
    return this.keywords;
  },
  sentiment: function () {
    return "";//this.sentiment;
  },
  author: function () {
    return this.author
  },
  source: function () {
    return this.source;
  }
});

/*
* When the singlecommentbox renders, do this:
*/

Template.singlecommentbox.rendered = function(){
  switch (this.data.sentiment) {
    case -2:
    this.$(".user-sentiment").css('background-color', '#e5596b');
    break;
    case -1:
    this.$(".user-sentiment").css('background-color', '#e5596b');
    break;
    case 0:
    this.$(".user-sentiment").css('background-color', '#fabe2c');
    break;
    case 1:
    this.$(".user-sentiment").css('background-color', '#1cb970');
    break;
    case 2:
    this.$(".user-sentiment").css('background-color', '#1cb970');
    break;
  }
};
