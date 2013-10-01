//function translateToSpanish(){

i18n_dict = {
"username" : "Nombre de usuario",
"password" : "contraseña",
"new experiment" : "nuevo experimento",
"experiment history" : "historia experimento",
"welcome" : "Bienvenido a iLabs!!!"
};
$.i18n.setDictionary(i18n_dict);

    $('#username').text($.i18n._('username'));
    $('#password').text($.i18n._('password'));
    $('#home_btn1').text($.i18n._('experiment history'));
    $('#home_btn2').text($.i18n._('new experiment'));
    $('#home_welcome').text($.i18n._('welcome'));
    //$('div#dynamic').text($.i18n._('Dynamic Content', [$(document).width(), $(document).height()]));

//}