'use strict'

directive = require './directive'

module.exports = angular.module 're:cms', [
	'ngResource'
	'ngSanitize'
]

.constant '$rcVersion', require('../package.json').version
.directive directive.name, -> directive
.provider '$rcResource', require './resource'
.service '$rcCache', require './cache'
.filter 'reCms', require './filter'
