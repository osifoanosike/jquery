function ProductStore() {
  this.product_model = "";
  this.product_data = null;
  this.product_selection = [];
  this.filters = { brands: [], colors: [], availableOnly: false };
  this.attributes = { brands: [], colors: [] }
}

ProductStore.prototype = {

  init: function() {
    this.setup_data();
    this.load_data_in_view(this.product_data);
    // this.filter();
  },

  create_product_item: function(product) {
    var $image_tag = $('<img/>', { 'src': 'images/' + product['url'] });
    return $('<figure>', {
      'data-name': product['name'],
      'data-color': product['color'],
      'data-brand': product['brand'],
      'data-soldout': product['sold_out']
    }).addClass('product-holder')
      .append($image_tag);
  },

  create_filter: function(value) {
    // console.log(product['brand']);
    var $checkbox = $('<input/>', {
      'type': 'checkbox',
      'id': value
    });

    var $label = $('<label>', { 'for': value, 'text': value });

    return $('<li>', { 'id': value })
      .append($checkbox)
      .append($label);
  },

  setup_data: function() {
    that = this;
    $.ajax({
      url: 'data/product.json',
      dataType: 'json',
      async: false,
    }).done(function(response_data){   
      that.product_data = response_data;
    });
  },

  load_data_in_view: function(data) {
    that = this;
    $.each(data, function(key, val){
      $('body #brand_list').append(that.populate_filter('brand', val['brand']));
      $('body #color_list').append(that.populate_filter('color',val['color']));
      $('body #catalogue').append(that.create_product_item(val));
    });
  },

  populate_filter: function(type, value) {
    if (this.attributes[type + 's'].indexOf(value) == -1) {
      this.attributes[type + 's'].push(value);
      return this.create_filter(value);
    }
  },

  filter: function() {
    var that = this, current_selection = null;
    $('#catalogue figure').hide();
    current_selection = $('#catalogue figure').filter(function() {
      if(that.filters.brands.length == 0){

        if ( $.inArray($(this).data('color'), that.filters.colors) >= 0) { return true; }

      } else if(that.filters.colors.length == 0) {

        if ( $.inArray($(this).data('brand'), that.filters.brands) >= 0) { return true; }

      } else if( that.filters.brands.length > 0 && that.filters.colors.length > 0 ){
        if($.inArray($(this).data('brand'), that.filters.brands) >= 0  && $.inArray($(this).data('color'), that.filters.colors) >= 0 ) { return true; }
      
      } else {
        if( $(this).data('name') != "0") { return true; }
      } 
    });
    console.log(current_selection);

    if( this.filters.availableOnly == "available") {
      console.log("show only available");
      
      current_selection.filter(function(){
        if( $(this).data('soldout') == 0 ) { return true }
      }).fadeIn(300);

    } else { 
      console.log("show all items")
      current_selection.fadeIn(350) 
    }
  },



  addEventHandlers: function(){
    that = this;    
    //filter by brand
    $('ul#brand_list').on('click', 'li input', function(){
      if(this.checked){
        that.filters.brands.push(this.id);
      }else {
        that.filters.brands.splice(that.filters.brands.indexOf(this.id), 1);
      }  
      that.filter();
    });

    //filter_by_color
    $('ul#color_list').on('click', 'li input', function(){
      if(this.checked){
        that.filters.colors.push(this.id);
      }else {
        that.filters.colors.splice(that.filters.colors.indexOf(this.id), 1);
      }

      that.filter(); 
    });

    $('div#available-filter').on('click', 'input', function(){
      that.filters.availableOnly = this.value;
      that.filter();
    });
  }
}

$(document).ready(function() {
  var productStore = new ProductStore();
  productStore.init();
  productStore.addEventHandlers();
  $('#check_show_all').checked = true;
});