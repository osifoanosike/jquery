function SlideShow(slides) {
  this.nav_area = "";
  this.slides = slides
  this.totalSlides = slides.find('li').length;
  this.firstSlide = slides.find('li:first-child');
  this.activeSlide = "";
}

SlideShow.prototype = {
  init: function() {
    this.slides.find('li').hide();
    this.firstSlide.show();
    this.moveToTop();
    this.createNavArea();
    this.startSlideshow();
  },

  moveToTop: function() {
    $('body').prepend(this.slides);
  },

  isLastSlide: function(slide_items) {
    return ($(slide_items).nextAll().length == 0);
  },

  showNextSlide: function(current_slide) {
    var that = this, nextSlide = this.setNextSlide(current_slide);
    this.updateNavArea();
    $(nextSlide).fadeIn(500).delay(3000)
      .fadeOut(400, function(){ that.showNextSlide(this) });
  },

  setNextSlide: function(current_slide) {
    this.activeSlide = $(current_slide).next();
    if (!this.isLastSlide($(current_slide))) {//if its not the last slide
      return $(current_slide).next()
    } else {
      return this.firstSlide;
    }
  },

  createNavArea: function() {
    this.nav_area = $('<div>', {'id':'nav-area'}).insertAfter(this.slides);
  },

  updateNavArea: function() {
    this.nav_area.text( (this.activeSlide.prevAll().length + 1) + ' of ' + this.totalSlides);
  },

  startSlideshow: function() {
    var that = this;
    this.activeSlide = this.firstSlide;
    this.updateNavArea()    
    this.activeSlide.delay(800)
      .fadeOut(400, function(){ that.showNextSlide(this) });
  }
}

$(document).ready(function(){
  var slides = $('#slideshow');
  var slideShow = new SlideShow(slides);
  slideShow.init();
});