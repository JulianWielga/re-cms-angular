'use strict'

directiveDefinition =
	name: 'reCms'
	restrict: 'AEC'
	controller: require './controller'
	controllerAs: 'C'
	scope: yes
	template: """
		<content ng-class="C.class" ng-if='!C.editable'>
			<content-html ng-if="C.html" ng-bind-html="C.html"></content-html>
			<content-text ng-if="!C.html">{{ C.content }}</content-text>
		</content>
		<textarea ng-model="C.editableContent" ng-model-options="C.editableContentOptions" ng-if='C.editable'></textarea>
		<json-formatter json='C'></json-formatter>
	"""

directiveDefinition.bindToController =
	path: '@?section'
	expr: "@?#{directiveDefinition.name}"
	editable: '=?'

module.exports = directiveDefinition
