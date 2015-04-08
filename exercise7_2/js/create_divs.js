function DivStack() {
  this.stack_container = "";
  this.model_stack_item = "";
  this.addButton = "";
}

DivStack.prototype = {
  init: function() {
    this.setupStack();
    this.createItemModel();
    divStack.addEventHandler();
  },

  createItemModel: function(){
    this.model_stack_item = $('<div>', { 'class': 'stack_item' })
      .css({ 'height':'2em', 'width': '75%', 'border':'1px solid #ccc',
        'border-radius': '3px','margin': '5px', 'background-color':'#fafafa' });
  },

  setupStack: function(){
    //create button
    var $button = $('<button>', {'id':'addBtn', text: 'add item'})
      .css({ 'position': 'absolute', 'bottom': '0', 'right': '0', 'margin': '5px' });

    //create container
    var $stack_container = $('<section>', { 'id': 'container' }).append($button)
      .css({ 'width': '45%', 'margin': '0 auto', 'border': 'solid 1px #ccc',
       'position': 'relative', 'min-height': '5em' });

    //add UI elements to the DOM 
    $('body').append($($stack_container));

    //make variables accessible to methods of the class.
    this.addButton = $button;
    this.stack_container = $stack_container;
  },

  add: function() {
    //items are added in a stack-like(LIFO) manner
    this.model_stack_item.clone(true).prependTo(this.stack_container);
  },

  addEventHandler: function() {
    var that = this;

    this.stack_container.on('click', 'div.stack_item', function(){
      if($(this).prevAll().length == 0 ){
        $(this).fadeOut(400, function(){ $(this).remove(); });
      } else {
        $(this).css('border-color', '#ffa600');
      }
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