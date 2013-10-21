var mobileapp = angular.module('services.checkInputfields',[]);
mobileapp.service('checkInputfields', function(){
	/**
    * @ngdoc function 
    * @name isTextboxempty
    * @description
    * Iterate through all the textboxes in the current step and check if they're empty or not
    * @returns {Boolean}
    */

    this.isTextboxempty = function(){
      var textbox_length = document.getElementsByTagName('input').length;
      var textbox_array = new Array();

      if (textbox_length != 0){
        for (var i = 0; i < textbox_length; i++){
          textbox_array[i] = document.getElementsByTagName('input')[i].value;
        }
      }
      if (textbox_array.length > 1){
        var textbox = jQuery.inArray('', textbox_array); 
        if (textbox != -1){ 
            return false;
        }else{
          return true;
        }
      }else{
        if (textbox_array[0] === ''){
          return false;
        }else{
          return true;
        }
      }
    }

    /**
    * @ngdoc function 
    * @name isDropdownempty
    * @description
    * Iterate through all the dropdowns in the current step and check if they're empty or not
    * @returns {Boolean}
    */

    this.isDropdownempty = function(){
      var dropdown_length = document.getElementsByTagName('select').length;
      var dropdown_array = new Array();

      if (dropdown_length != 0){
        for (var i = 0; i < dropdown_length; i++){
          dropdown_array[i] = document.getElementsByTagName('select')[i].value;
        }
      }
      if (dropdown_array.length > 1){
        var dropdown = jQuery.inArray('', dropdown_array);
        if (dropdown != -1){
          return false;
        }else{
          return true;
        }
      }else{
        if (dropdown_array[0] === ''){
          return false;
        }else{
          return true;
        }
      }
    }

    /**
    * @ngdoc function 
    * @name isTextareaempty
    * @description
    * Iterate through all the textareas in the current step and check if they're empty or not
    * @returns {Boolean}
    */

    this.isTextareaempty = function(){
      var textarea_length = document.getElementsByTagName('textarea').length;
      var textarea_array = new Array();

      if (textarea_length != 0){
        for (var i = 0; i < textarea_length; i++){
          textarea_array[i] = document.getElementsByTagName('textarea')[i].value;
        }
      }
      if (textarea_array.length > 1){
        var textarea = jQuery.inArray('', textarea_array);
        if (textarea != -1){
          return false;
        }else{
          return true;
        }
      }else{
        if (textarea_array[0] === ''){
          return false;
        }else{
          return true;
        }
      }
    }
});