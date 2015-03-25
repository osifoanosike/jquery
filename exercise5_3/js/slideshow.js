function SlideShow() {

}

SlideShow.prototype = {
  init: function() {
    $('#slideshow li:nth-child(n+2)').hide();//display only hte first slide on page load
    this.move_to_top();
  },

  move_to_top: function() {
    $('#slideshow').insertBefore('body > :first-child');
  },

  is_last_slide: function(slide_items) {
    return ($(slide_items).nextAll().length == 0);
  },

  show_next_slide: function(current_slide) {
    var that = this, next_slide = this.set_next_slide(current_slide);
    $(next_slide)
      .fadeIn(400)
      .delay(1400)
      .fadeOut(400, function(){ that.show_next_slide(this) });
  },

  set_next_slide: function(current_slide) {
    if (!this.is_last_slide($(current_slide))) {//if its not the last slide
      return $(current_slide).next()
    } else {
      return $('#slideshow li:first-child');
    }
  },

  start_slideShow: function() {
    var that = this;
    $('#slideshow li:first-child')
      .delay(800)
      .fadeOut(400, function(){ that.show_next_slide(this) });
  }
}

$(document).ready(function(){
  var slideShow = new SlideShow();
  slideShow.init();
  slideShow.start_slideShow();
});