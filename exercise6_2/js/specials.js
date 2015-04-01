function ContentLoader(specials_section) {
  this.specials_section = specials_section
  this.cached_data = null;
  this.specials_info_section = ""
}


ContentLoader.prototype = {
  init: function() {
    this.add_target_div();
  },

  add_target_div: function() {
    this.specials_info_section = $('<div>').insertAfter('#specials form');
  },

  addEventHandlers: function() {
    var that = this;
    this.specials_section.find('form select').on('change', function() {
    that.display_special_info($(this).val());
    });
  },

  display_special_info: function(selected_day) {
    var data = "";
    if(this.cached_data !== null) {
      data = this.display_data(selected_day, this.cached_data);
    } else {
      this.get_json_data(selected_day);
    }
  },

  display_data: function(selected_day, data) {
    console.log('selected_day: ' + selected_day + 'data: ' + data);
    var that = this;
    $.each(data, function(day, day_info){
      if(selected_day == day) {
        var $title = $('<h3>', { text: day_info['title'] });
        var $text = $('<p>', { text: day_info['text']});
        var $img_tag  = $('<img>', { src: day_info['image'].slice(1) });
        
        that.specials_info_section.empty()
          .attr('style', 'color: ' + day_info['color'])
          .append($title)
          .append($text)
          .append($img_tag);
      }
    });
  },

  get_json_data: function(selected_day) {
    var that = this;
    $.getJSON('data/specials.json', function(response_data){
      that.cached_data = response_data;
      that.display_data(selected_day, response_data);
    });
  },

  remove_submit_btn: function(){
    this.specials_section.find('.input_submit').remove();
  }
}

$(document).ready(function(){
  var specials_section = $('#specials');
  content_loader = new ContentLoader(specials_section);

  content_loader.init();
  content_loader.addEventHandlers();
  content_loader.remove_submit_btn();
});