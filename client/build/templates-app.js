angular.module('templates-app', ['explore/explore.tpl.html', 'home/home.tpl.html', 'login/login.tpl.html', 'register/register.tpl.html', 'steps/onestep.tpl.html']);

angular.module("explore/explore.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("explore/explore.tpl.html",
    "<div>\n" +
    "\n" +
    "<div class=\"bs-example-home\" style=\"margin-left:0px;margin-right:0px;\" >\n" +
    "\n" +
    "   <div class=\"form-group\" style=\"margin-bottom:15px;\">\n" +
    "    <div ng-show=\"searchFlag\">\n" +
    "       <input type=\"text\" class=\"form-control\" ng-model=\"searchText\" placeholder='Search Labjournal'>\n" +
    "<!--     <span class=\"input-group-addon\">\n" +
    "      <i class=\"fa fa-search\"></i>\n" +
    "    </span>\n" +
    " -->  \n" +
    "	  </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <h4> Suscribe: </h4>\n" +
    "\n" +
    "  <div class=\"list-group\">\n" +
    "    <div ng-repeat=\"journal in explore_journals\" ng-click=\"selectJournal(journal)\" ng-switch on=\"isSelected(journal)\" class=\"list-group-item\">\n" +
    "      <div class=\"container\">\n" +
    "	      <h5  class=\"pull-left\">\n" +
    "	      	 {{journal.title}}\n" +
    "	      </h5>\n" +
    "	      <span class=\"pull-right\" style=\"margin-top:10px;\" ng-switch-when=\"false\">\n" +
    "		      <i class=\"fa fa-chevron-left\"></i>\n" +
    "	      </span>\n" +
    "	      <span class=\"pull-right\" style=\"margin-top:10px;\" ng-switch-when=\"true\">\n" +
    "		      <i class=\"fa fa-chevron-down\"></i>\n" +
    "	      </span>\n" +
    "	   </div>\n" +
    "      <div class=\"container\" ng-switch-when=\"true\">\n" +
    "      		<div class=\"container\">\n" +
    "				<dl class=\"dl-horizontal pull-left\" >\n" +
    "					<dt> Author: </dt>\n" +
    "					<dd> {{journal.author}} </dd>\n" +
    "					<dt> Subject: </dt>\n" +
    "					<dd> {{journal.subject}} </dd>\n" +
    "				</dl>\n" +
    "			</div>\n" +
    "\n" +
    "			<dl>\n" +
    "				<dt> Description: </dt>\n" +
    "				<dd> {{journal.description}} </dd>\n" +
    "			</dl>\n" +
    "	      <div class=\"row\">\n" +
    "	      	<button type=\"submit\" ng-click='suscribe()' class=\"btn btn-primary btn-block\">Suscribe\n" +
    "	        </button>\n" +
    "	      </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "{{explore_journals}}\n" +
    "\n" +
    "</div>");
}]);

angular.module("home/home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/home.tpl.html",
    "<div class=\"bs-example\" style=\"margin-left:0px;margin-right:0px;\" >\n" +
    "\n" +
    "  <div class=\"form-group\" style=\"margin-bottom:15px;\">\n" +
    "\n" +
    "    <div ng-show=\"searchFlag\">\n" +
    "    <input type=\"text\" class=\"form-control\" ng-model=\"searchText\" placeholder='Search Labjournal'>\n" +
    "    </div>\n" +
    "  <!--     <span class=\"input-group-addon\">\n" +
    "      <i class=\"fa fa-search\"></i>\n" +
    "    </span>\n" +
    " -->  </div>\n" +
    "\n" +
    "  <h4> Inbox </h4>\n" +
    "  <div class=\"list-group\">\n" +
    "    <a ng-repeat=\"journal in assignments | filter:searchText\"class=\"list-group-item\" ng-click=\"goToAssignments(journal)\">\n" +
    "      <span style=\"text-align:left\">{{journal.lab_journal_title}}</span>\n" +
    "      <span style=\"float:right\"><i class=\"fa fa-chevron-right\"></i></span>\n" +
    "    </a>\n" +
    "  </div>\n" +
    "\n" +
    "  <h4> Favorites </h4>\n" +
    "  <div class=\"list-group\">\n" +
    "    <a ng-repeat=\"journal in suscriptions | filter:searchText\"class=\"list-group-item\" ng-click=\"goToAssignments(journal)\">\n" +
    "      <span style=\"text-align:left\">{{journal.lab_journal_title}}</span>\n" +
    "      <span style=\"float:right\"><i class=\"fa fa-chevron-right\"></i></span>\n" +
    "    </a>\n" +
    "  </div>\n" +
    "\n" +
    "  <button type=\"button\" ng-click=\"explore()\" class=\"btn btn-primary btn-lg btn-block\">Explore Journals</button>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "{{suscriptions | json }}\n" +
    "\n" +
    "<br>\n" +
    "<br>\n" +
    "<br>\n" +
    "\n" +
    "{{assignments | json}}\n" +
    "\n" +
    "\n" +
    "");
}]);

angular.module("login/login.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("login/login.tpl.html",
    "\n" +
    "<div class='bs-example' style=\"margin-left:0px;margin-right:0px;\">\n" +
    "  <form class=\"form-horizontal\" novalidate role=\"form\" name=\"loginForm\">\n" +
    "\n" +
    "    <div class=\"form-group\" ng-class=\"{'has-error': loginForm.username.$invalid && !loginForm.username.$pristine,'has-success': !loginForm.username.$invalid && !loginForm.username.$pristine}\">\n" +
    "        <div class='.col-xs-12 input-group'>\n" +
    "          <span class=\"input-group-addon\"><i class=\"fa fa-user fa-fw\"></i></span>\n" +
    "          <input type=\"text\" class=\"form-control\" id=\"inputEmail3\" placeholder=\"Username\" name=\"username\" ng-model=\"user.username\" ng-min='2' required/>\n" +
    "        </div>\n" +
    "          <small class=\"error\" ng-show=\"loginForm.username.$error.required && !loginForm.username.$pristine\">\n" +
    "            Your username is required\n" +
    "          </small>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"form-group\" ng-class=\"{'has-error': loginForm.password.$invalid && !loginForm.password.$pristine,'has-success': !loginForm.password.$invalid && !loginForm.password.$pristine}\">\n" +
    "        <div class='.col-xs-12 input-group'>\n" +
    "          <span class=\"input-group-addon\"><i class=\"fa fa-key fa-fw\"></i></span>\n" +
    "          <input type=\"password\" ng-model=\"user.password\" name=\"password\" class=\"form-control\" ng-min='2' id=\"inputPassword3\" placeholder=\"Password\" required>\n" +
    "        </div>\n" +
    "          <small class=\"error\" ng-show=\"loginForm.password.$error.required && !loginForm.password.$pristine\">\n" +
    "            Your password is required\n" +
    "          </small>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <div class=\"form-group\">\n" +
    "        <button type=\"submit\" style=\"margin-bottom:15px;\" ng-disabled=\"loginForm.$invalid\" ng-click='login()' class=\"btn btn-md btn-block\">Sign in\n" +
    "        </button>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"form-group\">\n" +
    "      <div>\n" +
    "        <span class=\"help-block\" style=\"text-align:center;\"><a>Forgot your password?</a></span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"form-group\">\n" +
    "      <div>\n" +
    "        <span ng-click=\"register()\" class=\"help-block\" style=\"text-align:center;\"><a>Join iLabs</a></span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    \n" +
    "\n" +
    "  </form>\n" +
    "</div>\n" +
    "\n" +
    "{{user | json}}\n" +
    "");
}]);

angular.module("register/register.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("register/register.tpl.html",
    "<div class='bs-example-reg'>\n" +
    "<form class=\"form-horizontal\" novalidate role=\"form\" name=\"myForm\">\n" +
    "\n" +
    "  <div class=\"form-group\">\n" +
    "    <div class=\"row input-group\" ng-class=\"{'has-error': myForm.username.$invalid && !myForm.username.$pristine,'has-success': !myForm.username.$invalid && !myForm.username.$pristine}\">\n" +
    "      <span class=\"input-group-addon\"><i class=\"fa fa-user fa-fw\"></i></span>\n" +
    "      <input type=\"text\" ng-model=\"user.username\" class=\"form-control\" id=\"username\" placeholder=\"iLabs Username\" name=\"username\" required ng-minlength='3' ng-maxlength='20'>\n" +
    "    </div>\n" +
    "    <small class=\"error\" ng-show=\"myForm.username.$error.required && !myForm.username.$pristine\">\n" +
    "            Please input a username\n" +
    "    </small>\n" +
    "    <small class=\"error\" ng-show=\"myForm.username.$error.minlength && !myForm.username.$pristine\">\n" +
    "            Your username is required to be at least 3 characters\n" +
    "    </small>\n" +
    "    <small class=\"error\" ng-show=\"myForm.username.$error.maxlength && !myForm.username.$pristine\">\n" +
    "            Your username cannot be longer than 20 characters\n" +
    "    </small>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\"\n" +
    "   ng-class=\"{'has-error': (myForm.password.$invalid && !myForm.password.$pristine) || (myForm.confirm_pw.$invalid && !myForm.confirm_pw.$pristine),'has-success': (!myForm.password.$invalid && !myForm.password.$pristine)&&(!myForm.confirm_pw.$invalid && !myForm.confirm_pw.$pristine)}\">\n" +
    "    <div class=\"row input-group\">\n" +
    "      <span class=\"input-group-addon\"><i class=\"fa fa-key fa-fw\"></i></span>\n" +
    "      <input name=\"password\" type=\"password\" ng-model=\"user.password\" class=\"form-control\" id=\"inputPassword3\" placeholder=\"Enter a Password\" required />\n" +
    "    </div>\n" +
    "    <small class=\"error\" ng-show=\"myForm.password.$error.required && !myForm.password.$pristine\">\n" +
    "      A password is required\n" +
    "    </small>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\" ng-class=\"{'has-error': (myForm.confirm_pw.$invalid && !myForm.confirm_pw.$pristine) || (myForm.password.$invalid && !myForm.password.$pristine),'has-success': (!myForm.confirm_pw.$invalid && !myForm.confirm_pw.$pristine) && (!myForm.password.$invalid && !myForm.password.$pristine)}\">\n" +
    "    <div class=\"row input-group\">\n" +
    "      <span class=\"input-group-addon\"><i class=\"fa fa-lock fa-fw\"></i></span>\n" +
    "      <input name=\"confirm_pw\" type=\"password\" ng-model=\"user.confirm_password\" class=\"form-control\" id=\"inputPassword3\" match=\"user.password\" placeholder=\"Re-enter a password\" required/>\n" +
    "    </div>\n" +
    "    <small class=\"error\" ng-show=\"myForm.confirm_pw.$error.mismatch && !myForm.confirm_pw.$pristine\">\n" +
    "      Your passwords don't match\n" +
    "    </small>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "\n" +
    "  <div class=\"form-group\" ng-class=\"{'has-error': myForm.firstname.$invalid && !myForm.firstname.$pristine,'has-success': !myForm.firstname.$invalid && !myForm.firstname.$pristine}\">\n" +
    "    <div class=\"row input-group\">\n" +
    "      <span class=\"input-group-addon\"><i class=\"fa fa-tags fa-fw\"></i></span>\n" +
    "      <input type=\"text\" name=\"firstname\" ng-model=\"user.firstname\" class=\"form-control\" id=\"inputEmail3\" placeholder=\"Firstname\" required capitalize-first ng-minlength='3' ng-maxlength='20' />\n" +
    "    </div>\n" +
    "    <small class=\"error\" ng-show=\"myForm.firstname.$error.required && !myForm.firstname.$pristine\">\n" +
    "            Your firstname is required\n" +
    "    </small>\n" +
    "    <small class=\"error\" ng-show=\"myForm.firstname.$error.minlength && !myForm.firstname.$pristine\">\n" +
    "            Your firstname is required to be at least 3 characters\n" +
    "    </small>\n" +
    "    <small class=\"error\" ng-show=\"myForm.firstname.$error.maxlength && !myForm.firstname.$pristine\">\n" +
    "            Your firstname cannot be longer than 20 characters\n" +
    "    </small>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\" ng-class=\"{'has-error': myForm.lastname.$invalid && !myForm.lastname.$pristine,'has-success': !myForm.lastname.$invalid && !myForm.lastname.$pristine}\">\n" +
    "    <div class=\"row input-group\">\n" +
    "      <span class=\"input-group-addon\"><i class=\"fa fa-tags fa-fw\"></i></span>\n" +
    "      <input type=\"text\" name=\"lastname\" ng-model=\"user.lastname\" class=\"form-control\" id=\"inputEmail3\" placeholder=\"Lastname\" required capitalize-first ng-minlength='3' ng-maxlength='20'/>\n" +
    "    </div>\n" +
    "    <small class=\"error\" ng-show=\"myForm.lastname.$error.required && !myForm.lastname.$pristine\">\n" +
    "            Your lastname is required\n" +
    "    </small>\n" +
    "    <small class=\"error\" ng-show=\"myForm.lastname.$error.minlength && !myForm.lastname.$pristine\">\n" +
    "            Your lastname is required to be at least 3 characters\n" +
    "    </small>\n" +
    "    <small class=\"error\" ng-show=\"myForm.lastname.$error.maxlength && !myForm.lastname.$pristine\">\n" +
    "            Your lastname cannot be longer than 20 characters\n" +
    "    </small>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\" ng-class=\"{'has-error': myForm.email.$invalid && !myForm.email.$pristine,'has-success': !myForm.email.$invalid && !myForm.email.$pristine}\">\n" +
    "    <div class=\"row input-group\">\n" +
    "      <span class=\"input-group-addon\"><i class=\"fa fa-envelope-o fa-fw\"></i></span>\n" +
    "      <input type=\"email\" ng-model=\"user.email\" class=\"form-control\" id=\"inputEmail3\" name=\"email\" placeholder=\"Email address\" required ng-minlength='3' ng-maxlength='20'/>\n" +
    "    </div>\n" +
    "    <small class=\"error\" ng-show=\"myForm.email.$error.required && !myForm.email.$pristine\">\n" +
    "            Your email is required\n" +
    "    </small>\n" +
    "    <small class=\"error\" ng-show=\"myForm.email.$error.email && !myForm.email.$pristine\">\n" +
    "            Invalid Email\n" +
    "    </small>\n" +
    "    <small class=\"error\" ng-show=\"myForm.email.$error.minlength && !myForm.email.$pristine\">\n" +
    "            Your email is required to be at least 3 characters\n" +
    "    </small>\n" +
    "    <small class=\"error\" ng-show=\"myForm.email.$error.maxlength && !myForm.email.$pristine\">\n" +
    "            Your email cannot be longer than 20 characters\n" +
    "    </small>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\">\n" +
    "    <div class=\"row\">\n" +
    "      <label for=\"affiliation\">Affiliation:</label>\n" +
    "      <select ng-model=\"user.affiliation\" class=\"form-control\" id=\"inputEmail3\" name=\"affiliation\" placeholder=\"Affiliation\" ng-options=\"a for a in affiliations\" required>\n" +
    "      </select>\n" +
    "      <small class=\"error\" ng-show=\"myForm.affiliation.$error.required && !myForm.affiliation.$pristine\">\n" +
    "              Affiliation is requried\n" +
    "      </small>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\" ng-class=\"{'has-error': myForm.SignupReason.$invalid && myForm.SignupReason.$dirty,'has-success': !myForm.SignupReason.$invalid && myForm.SignupReason.$dirty}\">\n" +
    "    <div class=\"row\">\n" +
    "      <label for=\"SignupReason\">Why do you want to sign up?</label>\n" +
    "      <textarea name=\"SignupReason\" id=\"SignupReason\" ng-model=\"user.reason\" class=\"form-control\" capitalize-first requried ng-minlength=\"8\" ng-maxlength=\"240\">\n" +
    "      </textarea>\n" +
    "    <small class=\"error\" ng-show=\"myForm.SignupReason.$error.required && myForm.SignupReason.$dirty\">\n" +
    "            This is a required field\n" +
    "    </small>\n" +
    "    <small class=\"error\" ng-show=\"myForm.SignupReason.$error.minlength && myForm.SignupReason.$dirty\">\n" +
    "            Your response cannot be shorter than 8 characters\n" +
    "    </small>\n" +
    "    <small class=\"error\" ng-show=\"myForm.SignupReason.$error.maxlength && myForm.SignupReason.$dirty\">\n" +
    "            Your response cannot be longer than 240 characters\n" +
    "    </small>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"row\" style=\"margin-bottom:15px;\">\n" +
    "    <button ng-disabled=\"myForm.$invalid\" type=\"button\" ng-submit=\"register()\" class=\"btn btn-primary btn-lg btn-block\">Register\n" +
    "    </button>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"row\">\n" +
    "    <button type=\"button\" ng-click=\"cancel()\" class=\"btn btn-danger btn-lg btn-block\">Cancel\n" +
    "    </button>\n" +
    "  </div>\n" +
    "\n" +
    "</form>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "{{user | json}}");
}]);

angular.module("steps/onestep.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("steps/onestep.tpl.html",
    "{{step.journal_step_title}}\n" +
    "\n" +
    "<markdown ng-model=\"step.journal_step_content\"> </markdown>\n" +
    "\n" +
    "\n" +
    "<parameters parameters=\"step.journal_parameter_group.parameters\" title=\"parametertitle\" data='data_param'> </parameters>\n" +
    "\n" +
    "<questions questions='step.questions' data='data_questions'>\n" +
    "</questions>\n" +
    "\n" +
    "\n" +
    "<br>\n" +
    "<button type=\"button\" ng-click=\"nextQuestion()\" class=\"btn btn-primary btn-lg btn-block\">Next</button>\n" +
    "<button type=\"button\" ng-click=\"doPatch()\" class=\"btn btn-primary btn-lg btn-block\">Patch</button>\n" +
    "<br>\n" +
    "<br>\n" +
    "<br>\n" +
    "\n" +
    "<br>\n" +
    "<br>\n" +
    "<br>\n" +
    "\n" +
    "\n" +
    "{{step}}\n" +
    "\n" +
    "<br>\n" +
    "<br>\n" +
    "<br>\n" +
    "\n" +
    "{{step.journal_parameter_group.parameters}}\n" +
    "<br>\n" +
    "<br>\n" +
    "<br>\n" +
    "\n" +
    "\n" +
    "\n" +
    "QUESTIONS:\n" +
    "{{data_questions}}\n" +
    "\n" +
    "<br>\n" +
    "<br>\n" +
    "<br>\n" +
    "\n" +
    "PARAMS:\n" +
    "{{data_param}}");
}]);
