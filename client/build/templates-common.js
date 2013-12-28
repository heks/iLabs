angular.module('templates-common', ['directive/parameters.tpl.html', 'directive/questions.tpl.html']);

angular.module("directive/parameters.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directive/parameters.tpl.html",
    "<div>\n" +
    "\n" +
    "	{{ title }}\n" +
    "\n" +
    "	<form class=\"form-horizontal\" novalidate name=\"paramForm\" role=\"form\">\n" +
    "		\n" +
    "		<div ng-repeat=\"parameter in parameters\">\n" +
    "\n" +
    "		<div ng-switch on=\"parameter.field_type\" ng-init=\"data[$index] = {'question':question.resource_uri,'instance':'/api/v1/labjournalinstance/x/' }\">\n" +
    "\n" +
    "			<div class='form-group' ng-switch-when=\"TA\">\n" +
    "				    <label for=\"TAparam\" class=\"row control-label\">{{parameter.title}}</label>\n" +
    "				    <div class=\"row\">\n" +
    "				      <input ng-model=\"data[$index].response\" type=\"text\" class=\"form-control\" id=\"TAparam\" name=\"TAparam\" placeholder=\"TAparam\" required>\n" +
    "				    </div>\n" +
    "				    <small>\n" +
    "						{{ parameter.help_text}}	\n" +
    "				    </small>\n" +
    "			</div>\n" +
    "\n" +
    "			<div class=\"form-group\" ng-switch-when=\"DD\">\n" +
    "				<label for=\"DDparam\" class=\"row control-label\">{{parameter.title}}</label>\n" +
    "				 <div class=\"row\">\n" +
    "					 <select ng-model=\"data[$index].response\" class=\"form-control\" name=\"DDparam\" id=\"DDparam\" ng-model='options' type=\"value\" ng-options=\"c for c in parameter.options\" required>\n" +
    "					 </select>\n" +
    "				</div>\n" +
    "				<small>\n" +
    "					{{ parameter.help_text}}	\n" +
    "				</small>	\n" +
    "			</div>\n" +
    "\n" +
    "			<div class=\"form-group\" ng-switch-when=\"SB\">\n" +
    "					<label for=\"SBparam\" class=\"row control-label\">{{parameter.title}}</label>\n" +
    "					<div class=\"row\">\n" +
    "						<div ui-slider min='{{parameter.options[0]}}' max='{{parameter.options[1]}}' step='{{parameter.options[2]}}' ng-model=\"data[$index].response\"></div>\n" +
    "					</div>\n" +
    "				<small>\n" +
    "					{{ parameter.help_text}}	\n" +
    "				</small>\n" +
    "			</div>\n" +
    "\n" +
    "			<div ng-switch-when=\"TF\">\n" +
    "				<label for=\"TFparam\" class=\"row control-label\">{{parameter.title}}</label>\n" +
    "				<textarea ng-model=\"data[$index].response\" name=\"TFparam\" id=\"TFparam\" class=\"form-control\" rows=\"3\"></textarea>\n" +
    "				<small>\n" +
    "					{{ parameter.help_text}}	\n" +
    "				</small>\n" +
    "			</div>	\n" +
    "<!-- \n" +
    "		 <slider floor=\"parameter.options[0] || 0\" ng-model=\"data[$index].response\" id=\"SBparam\" name=\"SBparam\" ceiling='parameter.options[1] || 3' step='parameter.options[2] || 1' precision=\"1\" required></slider> -->\n" +
    "\n" +
    "		</div>\n" +
    "	</form>\n" +
    "</div>\n" +
    "");
}]);

angular.module("directive/questions.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directive/questions.tpl.html",
    "<div>\n" +
    "\n" +
    "\n" +
    "	<div ng-repeat=\"question in questions\" \n" +
    "	ng-init=\"data[$index] = {'question':question.resource_uri,'instance':'/api/v1/labjournalinstance/x/',response:'' }\">\n" +
    "\n" +
    "\n" +
    "		<label class=\"row control-label\"> {{question.question.question_text}} </label>\n" +
    "\n" +
    "		<div class=\"form-group\" ng-switch=\"question.question.answer_field_type\">\n" +
    "		\n" +
    "			<div ng-switch-when=\"TA\">\n" +
    "				<input ng-model='data[$index].response' type=\"text\" class=\"form-control\" placeholder=\"TEXT AREA\" required/>\n" +
    "			</div>\n" +
    "\n" +
    "			<div ng-switch-when=\"DD\" class=\"row\">\n" +
    "				<select ng-model='data[$index].response' type=\"value\" ng-options=\"c for c in question.question.options\" required class=\"form-control\"/>\n" +
    "			</div>\n" +
    "\n" +
    "\n" +
    "			<div class=\"row\" ng-switch-when=\"SB\">\n" +
    "				<div ui-slider min='{{question.question.options[0]}}' max='{{question.question.options[1]}}' step='question.question.options[2]' ng-model=\"data[$index].response\"></div>\n" +
    "			</div>\n" +
    "\n" +
    "\n" +
    "			<div class=\"row\" ng-switch-when=\"TF\">\n" +
    "				<textarea ng-model='data[$index].response' class=\"form-control\" rows=\"3\" required></textarea>\n" +
    "			</div>\n" +
    "\n" +
    "		</div>	\n" +
    "\n" +
    "	</div>\n" +
    "\n" +
    "<!--\n" +
    "			<script type=\"text/ng-template\" id=\"ques/tpl.html\">\n" +
    "\n" +
    "		<slider floor='parseInt(question.question.options[0],10) || 0' ceiling='parseInt(question.question.options[1],10) || 13' step='parseInt(question.question.options[2],10) || 1' ng-model='data[$index].response' precision='parseInt(question.question.options[2],10) || 1'></slider>\n" +
    "\n" +
    "		</script>\n" +
    "\n" +
    "		-->\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "");
}]);
