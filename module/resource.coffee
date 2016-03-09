'use strict'

module.exports = class RCResourceProvider

	constructor: ->
		@setContentUrl()

	setContentUrl: (@contentUrl = '') -> return

	$get: [
		'$resource'
		($resource) ->
			$resource "#{@contentUrl}/:page"
	]

