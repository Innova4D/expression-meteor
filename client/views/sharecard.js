/*
* Sentiment Card Logic.
*/

/*
* When an event, do this:
*/
Template.sharecard.events({});


/*
* When reactive, do this:
*/
Template.sharecard.helpers({});

/*
* When the sharecard renders, do this:
*/
Template.sharecard.rendered = function () {
    var self = this;
    function animateCardBackground(bar) {
      var actioncard = self.$(".action-bar-share-card");
      console.log(bar);
      // switch (this.data.sentiment) {
      switch (bar) {
        case 0: //verynegative
        actioncard.css('background-color', '#b84353');
        break;
        case 1: //Negative
        actioncard.css('background-color', '#b84353');
        break;
        case 2: //Neutral
        actioncard.css('background-color', '#f5be4d');
        break;
        case 3: //Positive
        actioncard.css('background-color', '#39cb74');
        break;
        case 4: //verypositive
        actioncard.css('background-color', '#37ac65');
        break;
      }
    }

    Tracker.autorun(function () {
      var bar = Session.get("card-avg");
      animateCardBackground(bar);
    });
};
