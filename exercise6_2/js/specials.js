
/*
6.2 Load content using JSON
Open the file /exercises/index.html in your browser.
Use the file /exercises/js/specials.js. Your task is to show the user details
 about the special for a given day when the user selects a day from the select dropdown.
Append a target div after the form that's inside the #specials element;
 this will be where you put information about the special once you 
 receive it.
 Bind to the change event of the select element; when the 
 user changes the selection, 
 send an Ajax request to /exercises/data/specials.json.
*/
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
      that.get_json_data($(this))
    });
  },

  display_special_info: function(data) {
    console.log(data)    
    var $title = $('<h3>', { text: data['title'] });
    var $text = $('<p>', { text: data['text']});
    var $img_tag  = $('<img>', { src: data['image'].slice(1) });
    
    this.specials_info_section.empty()
      .attr('style', 'color: ' + data['color'])
      .append($title)
      .append($text)
      .append($img_tag);
  },

  prepare_display_data: function(selected_day, data) {
    var that = this;
    $.each(data, function(day, day_info){
      if($(selected_day).val() == day) {
        that.display_special_info(day_info);
      }
    });
  },

  get_json_data: function(selected_item) {
    var that = this;
    console.log(this.cached_data);
    if(this.cached_data !== null) {
      this.prepare_display_data(selected_item, this.cached_data);
    } else {
      console.log("no cached_data");
      $.getJSON('data/specials.json', function(response_data){
        that.cached_data = response_data;
        that.prepare_display_data(selected_item, response_data);
      });
    }
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