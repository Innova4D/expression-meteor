
Template.sentimentcard.events({
  'click .card-title': function (event,template) {
    template.$(".sentiment-card").toggleClass('flip');
  }
});

Template.sentimentcard.events({
  'click .comment-card': function (event,template) {
    var cardname = template.$(".card-title-front").text();
    Blaze.renderWithData(Template.commentbox, {id: this._id, name: this.name}, $("body")[0]);
  }
});

Template.sentimentcard.helpers({
  commentcounter: function(cardid){
    var oid = new Meteor.Collection.ObjectID(cardid._str);
    return Comments.find({ topic: oid }).count();
  }
});

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
