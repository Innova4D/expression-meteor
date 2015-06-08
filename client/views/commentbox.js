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
