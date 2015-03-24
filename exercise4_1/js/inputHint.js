function InputHint(input_field, label) {
  this.input_field = input_field;
  this.label = label;
}

InputHint.prototype = {
  init: function() {
    this.label.remove();
    this.add_hint();
  },

  add_hint: function() {
    this.input_field.addClass('hint').val(this.label.text());
  },

  remove_hint: function(search_input) {
    $(search_input).val('').removeClass('hint');
  },


  // remove_label: function() {
  //   this.label.remove();
  // },

  re_add_hint: function(search_input){
    if($(search_input).val().trim().length == 0) {
        this.add_hint();
      }
  },

  addEventHandlers: function(){
    var that = this;
    this.input_field.on('blur', function(){
      that.re_add_hint(this);
    });

    this.input_field.on('focus', function(){
      that.remove_hint(this);
    });

  }
}

$(document).ready(function(){
  var $search_form = $('form#search');
  var $search_input = $search_form.find(':text');
  var $label = $search_form.find('label');

  var inputHint = new InputHint($search_input, $label);
  inputHint.init();
  inputHint.addEventHandlers();
});