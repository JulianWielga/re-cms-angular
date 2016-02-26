'use strict'

module.exports = [
	'$resource'
	($resource) ->
		config = contentUrl: "http://localhost:8080"
		$resource "#{config.contentUrl}/content/:page/"
]