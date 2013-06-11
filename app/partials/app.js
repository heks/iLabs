var Lang = 
    (function() {var json = null;
        $.ajax({
            'async': false,
            'url': "/en_us.json",
            success: function (data) {
                json = JSON.parse(data);
            }
        });
        return json;
    })();


MyApplication.filter('translate', function (){
    return function(input){
        //
        // Check necessary locale locale
        //

       // .....

       //
       // Change locale
       //
       for (var prop in Lang){
           if (prop == input)
               // return translation
               return Lang[prop];
            }
    }
});