function Tab(tab_content) {
  this.header_list = "";
  this.tabcontents = tab_content;
}

Tab.prototype = {
  init: function() {
    this.tabcontents.hide();
    this.createList();
    this.setupModule();
    this.addEventHandlers();
  },

  createList: function(){
    this.header_list = $('<ul>', { 'id': 'tab_header' });

    this.header_list.insertBefore(this.tabcontents.first());
      console.log(this.header_list);
  },

  showRelatedModule: function(list_item){
    $(list_item).data('module')
      .show()
      .siblings('.module').hide();
  },

  setCurrentItem: function(list_item){
    $(list_item).addClass('current').siblings('.current').removeClass('current');//removes the last current item
  },

  setupModule: function() {
    var that = this;
    this.tabcontents.each(function(index){
      var list_text = $(this).find('h2').text();

      $('<li>', {'id': 'tab_'  + index, 'text': list_text})
        .data('module', $(this))
        .appendTo(that.header_list);
    });
  },

  showFirstTab: function(){
    var tab_header1 = $(this.header_list).find('li:first');
    this.showRelatedModule(tab_header1);
    this.setCurrentItem(tab_header1);
  },

  addEventHandlers: function(){
    var that = this;
    this.header_list.find('li').on('click', function() {
      that.showRelatedModule(this);
      that.setCurrentItem(this);
    });
  }
}

$(document).ready(function(){
  var modules = $('div.module');
  tab = new Tab(modules);
  tab.init();
  tab.showFirstTab();
});