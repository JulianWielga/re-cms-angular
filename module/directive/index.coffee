'use strict'

directiveDefinition =
	name: 'reCms'
	restrict: 'AEC'
	controller: require './controller'
	controllerAs: 'C'
	scope: yes
	template: """
		<content ng-if="C.html" ng-bind-html="C.html" ng-class="C.class"></content>
		<content ng-if="!C.html" ng-class="C.class">{{ C.content }}</content>
	"""

directiveDefinition.bindToController =
	path: '@?section'
	expr: "@?#{directiveDefinition.name}"

module.exports = directiveDefinition
