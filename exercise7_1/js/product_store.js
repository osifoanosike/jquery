function ProductStore() {
  this.product_model = "";
  this.product_data = null;
  this.filtered = null;
  // this.filters = { brands: [], colors: [], availableOnly: false };
  this.filter = { brand: [], color: [], soldout: []};
  this.attributes = { brands: [], colors: [] }
}

ProductStore.prototype = {

  init: function() {
    this.loadData();
    this.loadDataInView();
    this.allProducts = $('#catalogue figure');
    $('#check_show_all').prop('checked', true);
  },

  createProductItem: function(product) {
    var $image_tag = $('<img/>', { 'src': 'images/' + product['url'] });
    return $('<figure>', {
      'data-name': product['name'],
      'data-color': product['color'],
      'data-brand': product['brand'],
      'data-soldout': product['sold_out']
    }).addClass('product-holder')
      .append($image_tag);
  },

  create_filter: function(filterType, value) {
    var $checkbox = $('<input/>', {
      'type': 'checkbox',
      'data-value': value,
      'data-filterType': filterType
    });

    var $label = $('<label>', { 'for': value, 'text': value });

    return $('<li>', { 'id': value })
      .append($checkbox)
      .append($label);
  },

  loadData: function() {
    var that = this;
    $.ajax({
      url: 'data/product.json',
      dataType: 'json',
      async: false,
    }).done(function(response_data){   
      that.product_data = response_data;
    });
  },

  loadDataInView: function() {
    var that = this;
    $.each(this.product_data, function(key, val){
      $('body #brand_list').append(that.populateFilter('brand', val['brand']));
      $('body #color_list').append(that.populateFilter('color',val['color']));
      $('body #catalogue').append(that.createProductItem(val));
    });
  },

  populateFilter: function(type, value) {
    if (this.attributes[type + 's'].indexOf(value) == -1) {
      this.attributes[type + 's'].push(value);
      return this.create_filter(type, value);
    }
  },

  filterProducts: function() {
    var that = this;
    this.allProducts.hide();
    var filtered = this.allProducts;


    //loop thru each specified-filter and act appropriately
    for(var filter_type in this.filter) {
      if( this.filter[filter_type].length > 0 ) {
        filtered = filtered.filter(function() {
          if ( $.inArray($(this).data(filter_type), that.filter[filter_type]) >= 0) { return true; }
        }); 
      }
    }
    filtered.fadeIn(300);
  },

  clearAll: function() {
    $('input[type=checkbox]').prop('checked', false);
    for(var filter in this.filter){ this.filter[filter] = []; }
    this.filterProducts();
  },

  addEventHandlers: function(){
    var that = this;    
    //filter by brand
    $('#filter_section').on('click', 'input[type=checkbox]', function(){
      var filterType = $(this).data('filtertype');

      if(this.checked){
        that.filter[filterType].push($(this).data('value'));
      } else { that.filter[filterType].splice(that.filter[filterType].indexOf($(this).data('value')), 1) }  

      that.filterProducts();
    });

    $('#clearBtn').on('click', function(){
      that.clearAll();
    })
  }
}

$(document).ready(function() {
  var productStore = new ProductStore();
  productStore.init();
  productStore.addEventHandlers();
 
});