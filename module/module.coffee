'use strict'

directive = require './directive'

module.exports = angular.module 're:cms', [
	'ngResource'
	'ngSanitize'
]

.directive directive.name, -> directive
.factory '$rcResource', require './resource'
.service '$rcCache', require './cache'
.filter 'reCms', require './filter'

