function Tab() {
  this.header_list = "";
  this.tabcontents = $('div.module');
}

Tab.prototype = {
  init: function() {
    $('div.module').hide();
    this.create_list();
    this.setup_module();
  },

  create_list: function(){
    this.header_list = $('<ul>', { 'id': 'tab_header' })
      .insertBefore('div.module:first');
  },

  show_related_module: function(list_item){
    $(list_item).data('module')
      .show()
      .siblings('.module').hide();
  },

  set_current_item: function(list_item){
    $(list_item).siblings('.current').removeClass('current');//removes the last current item
    $(list_item).addClass('current');
  },

  setup_module: function() {
    this.tabcontents.each(function(index){
      var list_text = $(this).find('h2').text();

      $('<li>', {'id': 'tab_'  + index, 'text': list_text})
        .data('module', $(this))
        .appendTo('ul#tab_header');
    });
  },

  show_first_tab: function(){
    var tab_header1 = $(this.header_list).find('li:first');
    this.show_related_module(tab_header1);
    this.set_current_item(tab_header1);
  },

  addEventHandlers: function(){
    var that = this;
    this.header_list.on('click', function(e) {
      that.show_related_module(e.target);
      that.set_current_item(e.target);
    });
  }
}

$(document).ready(function(){
  tab = new Tab();
  tab.init();
  tab.addEventHandlers();
  tab.show_first_tab();
});