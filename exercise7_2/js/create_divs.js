function DivStack() {
  this.stack_container = "";
  this.model_stack_item = "";
  this.addButton = "";
  this.stackItemCount = 1;
}

DivStack.prototype = {
  init: function() {
    this.setupStack();
    this.createItemModel();
    this.addEventHandler();
  },

  createItemModel: function(){
    this.model_stack_item = $('<div>', { 'class': 'stack_item' });
  },

  setupStack: function(){
    //create button
    var $button = $('<button>', {'id':'addBtn', text: 'add item'});

    //create container
    var $stack_container = $('<section>', { 'id': 'container' }).append($button);

    //add UI elements to the DOM 
    $('body').append($($stack_container));

    //make variables accessible to methods of the class.
    this.addButton = $button;
    this.stack_container = $stack_container;
  },

  add: function() {
    //items are added in a stack-like(LIFO) manner
    this.model_stack_item.clone(true)
      .addClass('item' + this.stackItemCount++ )
      .prependTo(this.stack_container);
  },

  clickStackItem: function(item) {
    $('.selected').removeClass('selected');
    $(item).addClass('selected');

    if($(item).prevAll().length == 0 ){
      $(item).fadeOut(400, function(){ $(this).remove(); });
    }
  },

  addEventHandler: function() {
    var that = this;

    this.stack_container.on('click', 'div.stack_item', function(){
      that.clickStackItem(this);
    });

    this.addButton.on('click', function(){
      that.add();
    });
  }
}

$(document).ready(function() {
  var divStack = new DivStack();
  divStack.init();

});