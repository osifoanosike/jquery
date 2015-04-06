function SlideShow(slides) {
  this.nav_area = "";
  this.slides = slides
  this.total_slides = slides.find('li').length;
}

SlideShow.prototype = {
  init: function() {
    $('#slideshow li:nth-child(n+2)').hide();//display only hte first slide on page load
    this.move_to_top();
    this.create_nav_area();
    this.start_slideshow();
  },

  move_to_top: function() {
    $('#slideshow').insertBefore('body > :first-child');
  },

  is_last_slide: function(slide_items) {
    return ($(slide_items).nextAll().length == 0);
  },

  show_next_slide: function(current_slide) {
    var that = this, next_slide = this.set_next_slide(current_slide);
    this.update_nav_area($(next_slide).prevAll().length + 1, this.total_slides);
    $(next_slide).fadeIn(500).delay(3000)
      .fadeOut(400, function(){ that.show_next_slide(this) });
  },

  set_next_slide: function(current_slide) {
    if (!this.is_last_slide($(current_slide))) {//if its not the last slide
      return $(current_slide).next()
    } else {
      return $('#slideshow li:first-child');
    }
  },

  create_nav_area: function() {
    this.nav_area = $('<div>', {'id':'nav-area'}).insertAfter($('#slideshow'));
  },

  update_nav_area: function(current_slide_index) {
    this.nav_area.text( current_slide_index + ' of ' + this.total_slides);
  },

  start_slideshow: function() { 
    var $firstSlide = this.slides.find('li:first-child');
    var that = this;

    this.update_nav_area( $firstSlide.prevAll().length + 1 )    
    $firstSlide.delay(800)
      .fadeOut(400, function(){ that.show_next_slide(this) });
  }
}

$(document).ready(function(){
  var slides = $('#slideshow');
  var slideShow = new SlideShow(slides);
  slideShow.init();
});