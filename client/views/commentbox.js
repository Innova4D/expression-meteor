Template.commentbox.events({
  "change .showPositives": function (event) {
    Session.set("filter-comments",0);
  },
  "change .showNeutrals": function (event) {
    Session.set("filter-comments",1);
    Session.set("showNeutrals", {checked : event.target.checked, changed: event.timestamp});
  },
  "change .showNegatives": function (event) {
    Session.set("filter-comments",2);
  },
  "change .showAll": function (event) {
    Session.set("filter-comments",3);
  }
});

Template.commentbox.helpers({
  comments: function () {
    switch(Session.get("filter-comments")) {
      case 0: //Positives
      return Comments.find({topic: this.id, sentiment: { $gt: 0, $lt: 3 }});
      break;
      case 1: //Neutrals
      return Comments.find({topic: this.id, sentiment: 0});
      break;
      case 2: //Negatives
      return Comments.find({topic: this.id, sentiment: { $gt: -3, $lt: 0 }});
      break;
      case 3: //All
      return Comments.find({topic: this.id}, {sort: {posted:-1}});
      break;
      default:
      return Comments.find({topic: this.id}, {sort: {posted:-1}});
      break;
    }
  },
  keywords: function () {
    return this.keywords;
  }
});


Template.commentbox.events({
  'click .close-comment-box': function (event,template) {
    template.$(".comment-box").removeClass("animated fadeIn").addClass("animated fadeOut");
    template.$(".comment-box").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      template.$(".comment-box").remove();
    });
  }
});

/*
* Insert a Comment to MongoDB from CommentBox.
* Keypressed and OnClick Events...
*/

Template.commentbox.events({
  "click .comment-box-send": function (event, template) {
    // var random = _.sample([-2, -1, 0, 1, 2]); //Testing Purposes
    Comments.insert({
      topic: this.id,
      author: "Anonymous",
      posted: new Date(),
      loc: Session.get('geo'),
      sentiment: null,
      keywords: null,
      text: template.$(".comment-box-input").val(),
      source: "app"
    });
    // Clear form
    template.$(".comment-box-input").val("");

    // Prevent default form submit
    event.stopPropagation();
    return false;
  },

/* When new comment, the box must scroll to top:
 * Work in progress:
 * a=document.querySelector(".chat-list");a.scrollTop=a.scrollHeight}
 */

  "keypress paper-input": function (event, template) {
    // var random = _.sample([-2, -1, 0, 1, 2]); //Testing Purposes
    if (event.charCode == 13) {
      Comments.insert({
        topic: this.id,
        author: "Anonymous",
        posted: new Date(),
        loc: Session.get('geo'),
        sentiment: null,
        keywords: null,
        text: template.$(".comment-box-input").val(),
        source: "app"
      });
      // Clear form
      template.$(".comment-box-input").val("");

      // Prevent default form submit
      event.stopPropagation();
      return false;
    }
  }
});

Template.commentbox.rendered = function(){
  switch (this.data.avgsentiment) {
    case 0:
    this.$(".commentbox-sentiment-dot").css('background-color', '#e35a6d');
    break;
    case 1:
    this.$(".commentbox-sentiment-dot").css('background-color', '#e35a6d');
    break;
    case 2:
    this.$(".commentbox-sentiment-dot").css('background-color', '#f4bd57');
    break;
    case 3:
    this.$(".commentbox-sentiment-dot").css('background-color', '#41ca77');
    break;
    case 4:
    this.$(".commentbox-sentiment-dot").css('background-color', '#41ca77');
    break;
  }
};
