/*
* Sentiment Ribbon Logic.
*/

/*
* When an event, do this:
*/
Template.sentimentribbon.events({ });

/*
* When reactive, do this:
*/
Template.sentimentribbon.helpers({
  randomcomments: function(){
    var array = Comments.find({topic: this._id, sentiment: this.sentiment}).fetch();
    var randomIndex = Math.floor(Math.random() * array.length);
    var element = array[randomIndex];
    if(element) {
      return element.text;
    }
  }
});

/*
* When the card renders, do this:
*/
Template.sentimentcard.rendered = function () {

  var sf = this.$(".sentiment-card-front");
  var sb = this.$(".sentiment-card-back");
  var ab = this.$(".action-bar");
  var ri = this.$(".ribbon");

  switch (this.data.sentiment) {
    case -2:
    sf.css('background-color', '#d0495a');
    sb.css('background-color', '#d0495a');
    ab.css('background-color', '#ba4251');
    ri.css('background-color', '#ba4251');
    break;
    case -1:
    sf.css('background-color', '#f0cf3d');
    sb.css('background-color', '#f0cf3d');
    ab.css('background-color', '#be3a30');
    ri.css('background-color', '#be3a30');
    break;
    case 0:
    sf.css('background-color', '#f5be4d');
    sb.css('background-color', '#f5be4d');
    ab.css('background-color', '#dcaa45');
    ri.css('background-color', '#dcaa45');
    break;
    case 1:
    sf.css('background-color', '#88c124');
    sb.css('background-color', '#88c124');
    ab.css('background-color', '#be3a30');
    ri.css('background-color', '#be3a30');
    break;
    case 2:
    sf.css('background-color', '#39cb74');
    sb.css('background-color', '#39cb74');
    ab.css('background-color', '#30ad63');
    ri.css('background-color', '#30ad63');
    break;
  }
};
