/*** ***/


Template.opinionstats.events({
  'click .close-stats-box': function (event,template) {
    template.$(".opinionstats-full").removeClass("animated fadeIn").addClass("animated fadeOut");
    template.$(".opinionstats-full").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      template.$(".opinionstats-full").remove();
    });
  }
});

Template.opinionstats.helpers({
  title: function () {
    console.log(this);
    return this.name;
  }
});
